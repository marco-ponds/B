let UI;
if (process.argv[2] !== '--no-ui') {
    UI = require('./ui');
}
const B = require('../../dist/B.node');
const charles = require('./charles');
const Player = require('./Player');

process.setMaxListeners(Infinity);

let generationStep = 0;

const totalGenerations = 100;

let promises = [];

function evolve(browsers) {

    function evaluate() {
        const sorted = charles.population.sort(charles.sortByAccuracy);
        const top = sorted.slice(0, 5);
        const results = top.map((n) => n.getScore());

        if (UI) UI.logger.log(`-- Results: ${results}`);

        browsers.forEach(b => b.close());
    }

    function execute() {
        if (UI) UI.logger.log(`-- Doing generation ${generationStep+1} of ${totalGenerations}`);
        promises = charles.population.map((n, i) => Player.play(n.id(), generationStep, browsers[i])());
        Promise.all(promises)
        .then(() => {
            if (UI) UI.updateTable(charles.population);

            charles.population.forEach(Player.storeNet(generationStep));

            const average = charles.getAverageScore();

            if (UI) UI.logger.log(`-- Generationn average ${average}`);
            if (UI) UI.updateGraph(totalGenerations, average);

            generationStep++;

            if (generationStep > totalGenerations) {
                evaluate();
            } else {
                charles.evolve();
                if (UI) UI.logger.log('-- evolution, networks length, '+ charles.population.length);
                execute();
            }
        });
    }

    execute();
}

function stop() {
    process.exit(0);
}

if (UI) {
    UI.screen.key('q', () => {
        stop();
    });
}

Player.createBrowsers().then(evolve);
