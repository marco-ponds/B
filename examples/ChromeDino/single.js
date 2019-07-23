const fs = require('fs');
const B = require('../../dist/B.node');
const path = require('path');
const puppeteer = require('puppeteer');
const constants = require('./constants');
const Player = require('./Player');

const WIDTH = 500;
const HEIGHT = 300;

// read json options
const filename = path.join(__dirname, 'data/net#684073_0_58523.json');
const json = fs.readFileSync(filename, 'utf8');

// create network using that
const cradle = new B.Cradle();
const net = cradle.generate(json, constants.input, constants.output);

async function start() {

    let args = [
        '--mute-audio',
        '--window-size=500,300',
        '--hide-scrollbars',
        '--window-position=0,0'
    ];

    const browser = await puppeteer.launch({headless: false, args});

    Player.play(net, 0, browser);
}

start();
