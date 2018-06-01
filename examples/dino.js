const puppeteer = require('puppeteer');
const path = require('path');
const url = path.join(__dirname, 'test.html');

async function start() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setViewport({ width: 1024, height: 768 });
  await page.goto('https://google.com');
  // await page.goto('chrome://dino');
  await page.setOfflineMode(true);
  await page.reload();
  // await page.waitFor(1000);
  //
  // // start dino
  // await page.keyboard.down('Space');
  //
  //
  // setInterval(async () => {
  //     //await page.keyboard.down('Space');
  //     await page.keyboard.press('Space');
  //
  //     const obstacle = await page.evaluate(() => {
  //         if (Runner && Runner.instance_) {
  //             return Runner.instance_.horizon.obstacles[0];
  //         }
  //     })
  //     console.log(obstacle);
  //
  // }, 1000);

    setTimeout(async () => {
        await browser.close();
    }, 3000);

};

for (var i=0; i<10; i++) {
    start();
}

// determing number of generation

// generate population

// for each generation

// perform training on all networks, get score

// get avrage accuracy

// evolve generation
