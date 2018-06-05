const puppeteer = require('puppeteer');
const blessed = require('blessed');
const contrib = require('blessed-contrib');


const UI = {};

UI.screen = blessed.screen();
UI.grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: UI.screen
});
UI.logger = UI.grid.set(0, 0, 12, 3, contrib.log , {
    fg: 'green',
    label: 'Log',
    height: '100%',
    width: '50%',
    border: {type: "line", fg: "cyan"}
});
// UI.screen.append(UI.logger);

// UI.map = UI.grid.set(0, 3, 12, 9, contrib.map, {label: 'World Map'});
// UI.map.addMarker({"lon" : "-79.0000", "lat" : "37.5000", color: "red", char: "X" })

UI.screen.render();

async function play(network, browser) {
    UI.logger.log('Play!');
    const page = await browser.newPage();
    await page.goto('http://www.google.com');
    UI.logger.log('opened a new page');
}

const total = 10;
let promises = [];

async function start() {

    let browsers = [];

    for (var i=0; i<total; i++) {
        UI.logger.log(`creating ${i+1}`);
        const browser = await puppeteer.launch({headless: false});
        browsers.push(browser);
    }

    return browsers;
}

// start().then((browsers) => {
//     UI.logger.log('starting Promise ALL');
//     Promise.all(browsers.map((browser) => {
//         return play({}, browser);
//     })).then(() => {
//         UI.logger.log('done with Promise ALL');
//     })
// });
