// determing number of generation

// generate population

// for each generation

// perform training on all networks, get score

// get avrage accuracy

// evolve generation
const B = require('../dist/B.node');
const puppeteer = require('puppeteer');
const path = require('path');

/*
    input:
        - distance of closest obstacle (d)
        - size of closest obstacle (h,w)
        - position of closes obstacle (x, y)



*/

const totalGenerations = 2;

async function play(network) {


        console.log('creating browser with puppeteer');
        // starts puppeteer, plays dino with this network until the net dies
        const browser = await puppeteer.launch({headless: true });
        const page = await browser.newPage();

        await page.setViewport({ width: 800, height: 600 });
        await page.goto('https://google.com');
        await page.setOfflineMode(true);
        await page.reload();

        console.log('created page, lets play');

        // when it dies set score

        // have a "game" loop that get values and put into net
        // check if network is dead or not
        // if dead return
        // if not continue
        const startTime = +(new Date());
        const runningForMoreThan5Minutes = function() {
            return (+(new Date()) - startTime) > 300000;
        }

        const game = async () => {
            console.log('running');
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

            console.log('got inputs',
                obstacle.xPos,
                obstacle.yPos,
                obstacle.width,
                tRex.xPos,
                tRex.yPos,
                network
            );

            // feed networks
            network.setInput([
                obstacle.xPos,
                obstacle.yPos,
                obstacle.width,
                tRex.xPos,
                tRex.yPos
            ]);
            // network.calc()
            const output = network.calc();
            console.log('got output from network, ', output);
            // perform operation using output
            const jump = output[0];
            const duck = output[1];
            if (jump > 0.9) {
                console.log('jumping');
                await page.keyboard.press('Space');
            }
            if (duck > 0.9) {
                console.log('ducking');
                await page.keyboard.press('ArrowDown');
            }
            // check if dead
            const isDead = await page.evaluate(() => {
                if (Runner && Runner.instance_) {
                    return Runner.instance_.crashed;
                }
            });
            console.log('isDead = ', isDead);
            // if dead returns
            if (isDead) break;
        }

        while (true || !runningForMoreThan5Minutes()) {

        }

        // network is dead here

        // before returning set score for this network
        const score = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.distanceRan;
            }
        });
        console.log('score = ', score);
        network.setScore(score);
        // close browser here and return
        await browser.close();

        resolve(network);

}

function start() {
    const charles = new B.Darwin({
        count: 10,
        input: 5,
        output: 2,
        maxHiddenLayers: 5,
        retainPercentage: 0.5,
        mutationChance: 0.75
    });

    let networks = charles.create();

    function evaluate(networks) {
        console.log('evaluating');
        // sorting networks using sorting by accuracy,
        const sorted = networks.sort(charles.sortByAccuracy);
        // get the first 5
        const top = sorted.slice(0, 5);

        // print their results
        const results = top.map((n) => n.getScore());
        console.log(`-- Results: ${results}`);

        // save params somewhere
    }

    // define a function step that executes one iteration
    function execute(nets, step) {
        // for every network create a Promise
        console.log(`-- Doing generation ${step+1} of ${totalGenerations}`);
        // use Promise.all to resolve all of them
        Promise.all(nets.map((n) => {play(n)}))
        .then(() => {
            console.log('done playing with net ', nets.length);
            // when Promise all is resolved get average score
            const average = charles.getAverageScore(nets);
            console.log(`-- Generationn average ${average}`);
            // increase step
            const newStep = step + 1;

            if (newStep > totalGenerations) {
                // do something with the result, we're done here
                evaluate(networks);
            } else {
                // get the evolution, overriding networks outside
                networks = charles.evolve(networks);
                console.log('-- evolution, networks length, ', networks.length);
                // go to next step
                execute(networks, newStep);
            }
        });
    }

    // first round of execution
    execute(networks, 0);
}

start();
