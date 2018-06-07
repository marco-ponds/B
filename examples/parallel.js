const puppeteer = require('puppeteer');
const UI = require('./ui');
const B = require('../dist/B.node');

process.setMaxListeners(Infinity);

const play = (network, browser) => async () => {
    UI.logger.log('creating browser with puppeteer');
    // starts puppeteer, plays dino with this network until the net dies
    //const browser = await puppeteer.launch({headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 800, height: 600 });
    await page.goto('https://google.com');
    await page.setOfflineMode(true);
    await page.reload();

    UI.logger.log('created page, lets play');

    // when it dies set score

    // have a "game" loop that get values and put into net
    // check if network is dead or not
    // if dead return
    // if not continue
    const startTime = +(new Date());
    const runningForMoreThan5Minutes = function() {
        return (+(new Date()) - startTime) > 300000;
    }

    // make it start
    await page.keyboard.press('Space');

    while (true || !runningForMoreThan5Minutes()) {
        UI.logger.log('running');
        // get inputs
        let obstacle = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.horizon.obstacles[0];
            }
        });
        if (!obstacle) {
            obstacle = {
                xPos: 999,
                yPos: 20,
                width: 20
            };
        }
        const tRex = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.tRex;
            }
        });

        const speed = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.currentSpeed;
            }
        });

        UI.logger.log(['got inputs',
            speed,
            obstacle.xPos,
            obstacle.yPos,
            obstacle.width,
            tRex.xPos,
            tRex.yPos,
            network].join(' ')
        );

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
        const output = network.calc();
        UI.logger.log('got output from network, ' + output);
        // perform operation using output
        const jump = output[0];
        const duck = output[1];
        if (jump > 0.9) {
            UI.logger.log('jumping');
            await page.keyboard.press('Space');
        }
        if (duck > 0.9) {
            UI.logger.log('ducking');
            await page.keyboard.press('ArrowDown');
        }
        // check if dead
        const isDead = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.crashed;
            }
        });
        UI.logger.log('isDead = ' + isDead);
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
    UI.logger.log('score = '+ score);
    network.setScore(score);
    // close browser here and return
    await page.close();
}

const totalBrowsers = 10;
const totalGenerations = 50;

let promises = [];

async function start() {

    let browsers = [];

    for (var i=0; i<totalBrowsers; i++) {
        UI.logger.log(`creating ${i+1}`);
        const browser = await puppeteer.launch({headless: false});
        browsers.push(browser);
    }

    return browsers;
}

function evolve(browsers) {
    const charles = new B.Darwin({
        count: totalBrowsers,
        input: 6,
        output: 2,
        maxHiddenLayers: 5,
        retainPercentage: 0.5,
        mutationChance: 0.75
    });

    let networks = charles.create();

    UI.updateTable(networks);

    function evaluate(networks) {
        UI.logger.log('evaluating');
        // sorting networks using sorting by accuracy,
        const sorted = networks.sort(charles.sortByAccuracy);
        // get the first 5
        const top = sorted.slice(0, 5);

        // print their results
        const results = top.map((n) => n.getScore());
        UI.logger.log(`-- Results: ${results}`);

        // save params somewhere
    }

    // define a function step that executes one iteration
    function execute(nets, step) {
        // for every network create a Promise
        UI.logger.log(`-- Doing generation ${step+1} of ${totalGenerations}`);
        // use Promise.all to resolve all of them
        promises = nets.map((n, i) => play(n, browsers[i])());
        Promise.all(promises)
        .then(() => {
            UI.updateTable(nets);
            UI.logger.log('done playing with net '+ nets.length);
            // when Promise all is resolved get average score
            const average = charles.getAverageScore(nets);
            UI.logger.log(`-- Generationn average ${average}`);
            // increase step
            const newStep = step + 1;

            if (newStep > totalGenerations) {
                // do something with the result, we're done here
                evaluate(networks);
            } else {
                // get the evolution, overriding networks outside
                networks = charles.evolve(networks);
                UI.logger.log('-- evolution, networks length, '+ networks.length);
                // go to next step
                execute(networks, newStep);
            }
        });
    }

    // first round of execution
    execute(networks, 0);
}

function stop() {
    process.exit(0);
}

/*
UI.form.on('submit', (data) => {
  UI.form.setContent('started.');
  UI.screen.render();
});

UI.form.on('reset', (data) => {
  UI.form.setContent('stopped.');
  UI.screen.render();
});
*/

UI.screen.key('q', () => {
    stop();
});

start().then(evolve);
