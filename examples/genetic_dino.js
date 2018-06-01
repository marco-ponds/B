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

async play(network) {
    // starts puppeteer, plays dino with this network until the net dies
    // when it dies set score

    // creating a browser

    // creating the page with dino

    // have a "game" loop that get values and put into net
    // check if network is dead or not
    // if dead return
    // if not continue

    while (true || runningForMoreThan5Minutes) {
        // get inputs
        // feed networks
        // network.calc()
        // get output

        // perform operation using output
        // check if dead
        // if dead returns
    }

    // network is dead here

    // before returning set score for this network

    // close browser here and return
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

    function evaluate(networks) {
        // sorting networks using sorting by accuracy,

        // get the first 5

        // print their results

        // save params somewhere
    }

    // define a function step that executes one iteration
    function execute(nets, step) {
        // for every network create a Promise

        // use Promise.all to resolve all of them

        // when Promise all is resolved get average score

            // get the evolution, overriding networks outside

            // increase step
            const newStep = step + 1;

            if (step > totalGenerations) {
                // do something with the result, we're done here
            } else {
                // go to next step
                execute(networks, newStep);
            }
    }

    // first round of execution
    execute(networks, 0);

    // for (var i = 0; i < totalGenerations; i++) {
    //     console.log(`-- Doing generation ${i+1} of ${totalGenerations}`);
    //
    //     // play
    //     // await networks.forEach((net) => {
    //     //     play(net);
    //     // });
    //     //
    //     // Promise.all([
    //     //     play(net)
    //     // ]).then(() => {
    //     //     console.log(`-- Generationn average ${charles.getAverageScore(networks)}`);
    //     // })
    //
    //
    //
    // }
}
