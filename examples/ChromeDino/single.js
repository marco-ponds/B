const fs = require('fs');
const B = require('../../dist/B.node');
const path = require('path');
const puppeteer = require('puppeteer');
const Player = require('./Player');

// read json options
const filename = path.join(__dirname, 'data/net#296455_22_18183.json');
const json = fs.readFileSync(filename, 'utf8');

// create network using that
const cradle = new B.Cradle();
const net = cradle.generate(json, 4, 2);

console.log(net);

async function start() {
    // create browser
    const browser = await puppeteer.launch({headless: false});

    // let him play
    Player.play(net, 0, browser)();
}

start();
