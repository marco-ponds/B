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

function startEvolution(browsers) {

    function evaluate() {
        const sorted = charles.population.sort(charles.sortByAccuracy);
        const top = sorted.slice(0, 5);
        const results = top.map((n) => n.getScore());

        if (UI) UI.logger.log(`-- Results: ${results}`);

        close();
    }

    async function close() {
        await browsers.forEach(async b => await b.close());
        stop();
    }

    function stop() {
        process.exit(0);
    }

    function nextStep() {
        if (UI) UI.updateTable(charles.population);

        charles.population.forEach(Player.storeNet(generationStep));

        const average = charles.getAverageScore();
        console.log('generation:', generationStep, ', average:', average);

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
    }

    function execute() {
        if (UI) UI.logger.log(`-- Doing generation ${generationStep+1} of ${totalGenerations}`);
        promises = charles.population.map((n, i) => Player.play(n.id(), generationStep, browsers[i], i));
        Promise.all(promises)
            .then(nextStep)
            .catch(nextStep);
    }

    execute();
}



if (UI) {
    UI.screen.key('q', () => {
        stop();
    });
}

Player.createBrowsers().then(startEvolution);
