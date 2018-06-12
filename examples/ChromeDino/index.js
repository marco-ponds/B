const UI = require('./ui');
const B = require('../../dist/B.node');
const charles = require('./charles');
const Player = require('./Player');

process.setMaxListeners(Infinity);

let generationStep = 0;

const totalGenerations = 100;

let promises = [];

function evolve(browsers) {
    //UI.updateTable(charles.population);

    function evaluate() {
        // sorting networks using sorting by accuracy,
        const sorted = charles.population.sort(charles.sortByAccuracy);
        // get the first 5
        const top = sorted.slice(0, 5);

        // print their results
        const results = top.map((n) => n.getScore());
        UI.logger.log(`-- Results: ${results}`);

        // save params somewhere

        // kill every broewser
        browsers.forEach(b => b.close());
    }

    // define a function step that executes one iteration
    function execute() {
        // for every network create a Promise
        UI.logger.log(`-- Doing generation ${generationStep+1} of ${totalGenerations}`);
        // use Promise.all to resolve all of them
        promises = charles.population.map((n, i) => Player.play(n.id(), generationStep, browsers[i])());
        Promise.all(promises)
        .then(() => {
            UI.updateTable(charles.population);
            charles.population.map(Player.storeNet(generationStep));
            // when Promise all is resolved get average score
            const average = charles.getAverageScore();
            UI.logger.log(`-- Generationn average ${average}`);
            UI.updateGraph(totalGenerations, average);
            // increase step
            //const newStep = step + 1;
            generationStep++;

            if (generationStep > totalGenerations) {
                // do something with the result, we're done here
                evaluate();
            } else {
                // get the evolution, overriding networks outside
                charles.evolve();
                UI.logger.log('-- evolution, networks length, '+ charles.population.length);
                // go to next step
                execute();
            }
        });
    }

    // first round of execution
    execute();
}

function stop() {
    process.exit(0);
}

UI.screen.key('q', () => {
    stop();
});

Player.createBrowsers().then(evolve);
