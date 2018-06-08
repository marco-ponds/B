const puppeteer = require('puppeteer');
const UI = require('./ui');
const B = require('../dist/B.node');

process.setMaxListeners(Infinity);

let charles;

const getClosestObstacle = (obstacles, tRex) => {
    if (obstacles.length === 0) {
        return null;
    }

    let closest = obstacles[0];
    let refD = closest.xPos - tRex.xPos;

    obstacles.forEach((o) => {
        let d = o.xPos - tRex.xPos;
        if (d < refD && o.xPos > tRex.xPos) {
            refD = d;
            closest = o;
        }
    });

    return closest;
}

const play = (networkId, browser) => async () => {
    // starts puppeteer, plays dino with this network until the net dies
    //const browser = await puppeteer.launch({headless: true });
    const network = charles.getNetwork(networkId);
    const page = await browser.newPage();

    await page.setViewport({ width: 800, height: 600 });
    await page.goto('https://google.com');
    await page.setOfflineMode(true);
    await page.reload();

    // when it dies set score

    // have a "game" loop that get values and put into net
    // check if network is dead or not
    // if dead return
    // if not continue
    const startTime = +(new Date());
    const runningForMoreThan5Minutes = function() {
        return (+(new Date()) - startTime) > 300000;
    }
    const holdOnFor = (timeout) => new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
    let noObstacles = 0;

    // make it start
    await page.keyboard.press('Space');

    await holdOnFor(4000);

    while (true || !runningForMoreThan5Minutes()) {

        await holdOnFor(250);

        // get inputs

        const tRex = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.tRex;
            }
        });

        let obstacles = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.horizon.obstacles;
            }
        });
        let obstacle = getClosestObstacle(obstacles, tRex);
        if (!obstacle) {
            noObstacles++;

            if (noObstacles > 20) break;

            obstacle = {
                xPos: 999,
                yPos: 20,
                width: 20
            };
        }

        const speed = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.currentSpeed;
            }
        });

        // feed networks
        network.setInput(B.util.normalise([
            speed,
            obstacle.xPos,
            obstacle.yPos,
            obstacle.width,
            tRex.xPos,
            tRex.yPos
        ]));
        // network.calc()
        const output = network.calc()[0];
        // perform operation using output
        // const jump = output[0];
        // const duck = output[1];
        // if (jump > 0.9) {
        //     UI.logger.log('jumping');
        //     await page.keyboard.press('Space');
        // } else if (duck > 0.9) {
        //     UI.logger.log('ducking');
        //     await page.keyboard.press('ArrowDown');
        // }

        if (output > 0.9) {
            // UI.logger.log('jumping');
            await page.keyboard.press('Space');
        } else {
            // UI.logger.log('ducking');
            await page.keyboard.press('ArrowDown');
        }
        // check if dead
        const isDead = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.crashed;
            }
        });
        network.data('dead', isDead);
        // if dead returns
        if (isDead) break;
    }

    // network is dead here

    // before returning set score for this network
    const score = await page.evaluate(() => {
        if (Runner && Runner.instance_) {
            return Runner.instance_.distanceRan;
        }
    });
    network.setScore(score);

    //UI.updateTable(charles.population);
    // close browser here and return
    await page.setOfflineMode(false);
    await page.close();
}

const totalBrowsers = 10;
const totalGenerations = 100;

let promises = [];

async function start() {

    let browsers = [];

    for (var i=0; i<totalBrowsers; i++) {
        UI.logger.log(`- creating ${i+1} browser`);
        const browser = await puppeteer.launch({headless: false});
        browsers.push(browser);
    }

    return browsers;
}

function evolve(browsers) {
    charles = new B.Darwin({
        count: totalBrowsers,
        input: 6,
        output: 1,
        maxHiddenLayers: 5,
        retainPercentage: 0.75,
        mutationChance: 0.3
    });

    charles.create();

    //UI.updateTable(charles.population);

    function evaluate() {
        // sorting networks using sorting by accuracy,
        const sorted = charles.population.sort(charles.sortByAccuracy);
        // get the first 5
        const top = sorted.slice(0, 5);

        // print their results
        const results = top.map((n) => n.getScore());
        UI.logger.log(`-- Results: ${results}`);

        // save params somewhere

        // kill every broewser
        browsers.forEach(b => b.close());
    }

    // define a function step that executes one iteration
    function execute(step) {
        // for every network create a Promise
        UI.logger.log(`-- Doing generation ${step+1} of ${totalGenerations}`);
        // use Promise.all to resolve all of them
        promises = charles.population.map((n, i) => play(n.id(), browsers[i])());
        Promise.all(promises)
        .then(() => {
            UI.updateTable(charles.population);
            // when Promise all is resolved get average score
            const average = charles.getAverageScore();
            UI.logger.log(`-- Generationn average ${average}`);
            UI.updateGraph(totalGenerations, average);
            // increase step
            const newStep = step + 1;

            if (newStep > totalGenerations) {
                // do something with the result, we're done here
                evaluate();
            } else {
                // get the evolution, overriding networks outside
                charles.evolve();
                UI.logger.log('-- evolution, networks length, '+ charles.population.length);
                // go to next step
                execute(newStep);
            }
        });
    }

    // first round of execution
    execute(0);
}

function stop() {
    process.exit(0);
}

UI.screen.key('q', () => {
    stop();
});

start().then(evolve);
