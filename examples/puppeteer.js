const puppeteer = require('puppeteer');

function Puppeteer() {}

Puppeteer.prototype = {

    start: function() {
        return puppeteer.launch({headless: true});
    }

    play: async function(browser, network) {
        console.log('creating browser with puppeteer');
        // starts puppeteer, plays dino with this network until the net dies
        //const browser = await puppeteer.launch({headless: true });
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

        while (true || !runningForMoreThan5Minutes()) {
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
    }
}

module.exports = Puppeteer;
