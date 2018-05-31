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

const totalGenerations = 100;

play(network) {
    // starts puppeteer, plays dino with this network until the net dies
    // when it dies set score

}

function start() {
    const charles = new B.Darwin({
        count: 50,
        input: 5,
        output: 2,
        maxHiddenLayers: 5,
        retainPercentage: 0.5,
        mutationChance: 0.75
    });

    let networks = charles.create();

    for (var i = 0; i < totalGenerations; i++) {
        console.log(`-- Doing generation ${i+1} of ${totalGenerations}`);

        // play
        await networks.forEach((net) => {
            play(net);
        });

        Promise.all([
            play(net)
        ]).then(() => {
            console.log(`-- Generationn average ${charles.getAverageScore(networks)}`);
        })

    }
}
