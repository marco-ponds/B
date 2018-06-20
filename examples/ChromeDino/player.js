const puppeteer = require('puppeteer');
let UI;
if (process.argv[2] !== '--no-ui') {
    UI = require('./ui');
}
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const B = require('../../dist/B.node');

const charles = require('./charles');
const WIDTH = 800;
const HEIGHT = 300;

const MINIMUM_SCORE = 15000;

let Player = {};

Player.createBrowsers =  async function() {
    let browsers = [];

    puppeteer.defaultArgs(['--window-size=400,300']);

    let row = 0;
    let col = 0;
    let cols = 5;

    for (var i=0; i<constants.totalPopulation; i++) {

        const pos = {
            x: WIDTH * col,
            y: HEIGHT * row
        };
        if (( i + 1 ) % 3 === 0) {
            row++;
            col = 0;
        } else {
            col++;
        }

        if (UI) UI.logger.log(`--window-position=${pos.x},${pos.y}`);

        let args = [
            `--window-size=${WIDTH},${HEIGHT}`,
            `--window-position=${pos.x},${pos.y}`
        ];

        if (UI) UI.logger.log(`- creating ${i+1} browser`);
        const browser = await puppeteer.launch({headless: false, args});
        browsers.push(browser);
    }

    return browsers;
},

Player.getClosestObstacles = (obstacles, tRex) => {
    if (obstacles.length === 0) {
        return [];
    }

    return obstacles.filter((o) => o.xPos > tRex.xPos).slice(0, 2);
},

Player.storeNet = (generation) => {
    return (net) => {
        const score = net.getScore();
        if (score > MINIMUM_SCORE) {
            const filename = path.join(__dirname, `data/${net.id()}_${generation}_${Math.floor(net.getScore())}.json`);
            const content = net.toJSON();
            fs.writeFile(filename, net.toJSON(), 'utf8', function(err) {});
        }
    }
};

Player.play = (net, generationStep, browser) => async () => {
    let network;
    if (typeof(net) == 'string') {
        network = charles.getNetwork(net);
    } else {
        network = net;
    }
    const page = await browser.newPage();

    await page.setViewport({ width: WIDTH, height: HEIGHT });
    await page.goto('https://google.com');
    await page.setOfflineMode(true);
    await page.reload();

    await page.evaluate(_ => {
        window.scrollBy(0, -1000);
    });

    const startTime = +(new Date());
    const runningForMoreThan5Minutes = function() {
        return (+(new Date()) - startTime) > 300000;
    }

    const holdOnFor = (timeout) => new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

    let noObstacles = 0;

    await page.keyboard.press('Space');

    await holdOnFor(4000);

    while (true || !runningForMoreThan5Minutes()) {

        await holdOnFor(150);

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
        let closeObstacles = Player.getClosestObstacles(obstacles, tRex);
        const defaultObstacle = {
            xPos: 500,
            yPos: 20,
            width: 20
        };
        let firstObstacle = closeObstacles[0] || defaultObstacle;
        let secondObstacle = closeObstacles[1] || defaultObstacle;

        if (!closeObstacles.length) {
            noObstacles++;

            if (noObstacles > 20) break;
        }

        const speed = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.currentSpeed;
            }
        });

        network.setInput(B.util.normalise([
            speed,
            firstObstacle.xPos,
            firstObstacle.yPos,
            firstObstacle.width
        ]));

        const output = network.calc();

        const jump = output[0];
        const duck = output[1];
        if (jump > 0.9) {
            await page.keyboard.press('Space');
        } else if (duck > 0.9) {
            await page.keyboard.press('ArrowDown');
        }

        const isDead = await page.evaluate(() => {
            if (Runner && Runner.instance_) {
                return Runner.instance_.crashed;
            }
        });

        network.data('dead', isDead);

        if (isDead) break;
    }

    const score = await page.evaluate(() => {
        if (Runner && Runner.instance_) {
            return Runner.instance_.distanceRan;
        }
    });
    network.setScore(score);

    await page.setOfflineMode(false);
    await page.close();
    if (process.argv[2] !== '--no-file') {
        Player.storeNet(network, generationStep);
    }

}

module.exports = Player;
