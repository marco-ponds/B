const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const B = require('../../dist/B.node');

const charles = require('./charles');
const WIDTH = 500;
const HEIGHT = 300;
const MINIMUM_SCORE = 4000;//15000;

let Player = {};

Player.createBrowsers =  async function() {
    Player.browsers = [];

    puppeteer.defaultArgs([
        '--mute-audio',
        '--hide-scrollbars'
    ]);

    let row = 0;
    let col = 0;

    for (let i=0; i<constants.totalPopulation; i++) {

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

        let args = [
            '--mute-audio',
            `--window-size=${WIDTH},${HEIGHT}`,
            `--window-position=${pos.x},${pos.y}`
        ];

        const browser = await puppeteer.launch({headless: false, args});
        Player.browsers.push(browser);
    }
},

Player.getClosestObstacles = (obstacles, tRex) => {
    if (obstacles.length === 0) {
        return [];
    }

    return obstacles
        .filter((o) => o.xPos > tRex.xPos)
        .map(o => ({ ...o, distance: o.xPos - tRex.xPos }))
        .slice(0, 2);
},

Player.storeNet = (generation) => {
    return (net) => {
        const score = net.getScore();
        if (score > MINIMUM_SCORE) {
            const filename = path.join(__dirname, `data/${net.id()}_${generation}_${Math.floor(net.getScore())}.json`);
            fs.writeFile(filename, net.toJSON(), 'utf8', function(err) {});
        }
    }
};

Player.play = async (net, generationStep, browser, i) => {
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
    const runningForLessThan5Minutes = () => (+(new Date()) - startTime) < 3000000;

    const holdOnFor = (timeout) => new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

    await page.keyboard.press('Space');
    await holdOnFor(4000);

    while (runningForLessThan5Minutes()) {

        try {
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
            let firstObstacle = closeObstacles[0] || constants.defaultObstacle;

            const speed = await page.evaluate(() => {
                if (Runner && Runner.instance_) {
                    return Runner.instance_.currentSpeed;
                }
            });

            network.setInput(B.util.normalise([
                speed,
                firstObstacle.distance,
                firstObstacle.yPos,
                firstObstacle.width
            ]));

            const output = network.calc();
            const { max, index } = B.util.maxIndex(output);

            // if (i === 0) console.log(output, 'max', max, 'index', index);

            switch(index) {
                case 0:
                    if (i === 0) console.log('RUN');
                    await page.keyboard.up('Space');
                    await page.keyboard.up('ArrowDown');

                    break;
                case 1:
                    if (i === 0) console.log('JUMP');
                    await page.keyboard.down('Space');
                    break;
                case 2:
                    if (i === 0) console.log('DUCK');
                    await page.keyboard.down('ArrowDown');
                    break;
            }

            const isDead = await page.evaluate(() => {
                if (Runner && Runner.instance_) {
                    return Runner.instance_.crashed;
                }
            });

            network.data('dead', isDead);

            if (isDead) {
                await holdOnFor(1500);
                break;
            }
        } catch (e) {
            console.log('EXCEPTION', e);
        }
    }

    console.log('getting score and closing');

    const score = await page.evaluate(() => {
        if (Runner && Runner.instance_) {
            return Runner.instance_.distanceRan;
        }
    });
    network.setScore(score);
    await page.close();
}

module.exports = Player;
