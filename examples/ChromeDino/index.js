const charles = require('./charles');
const Player = require('./Player');
const constants = require('./constants');

process.setMaxListeners(Infinity);

let generationStep = 0;

function startEvolution() {

    function evaluate() {
        const sorted = charles.population.sort(charles.sortByAccuracy);
        const top = sorted.slice(0, 5);
        const results = top.map((n) => n.getScore());

        console.log(results);

        close().then(stop);
    }

    function nextStep() {
        charles.population.forEach(Player.storeNet(generationStep));

        const average = charles.getAverageScore();
        console.log('generation:', generationStep, ', average:', average);

        generationStep++;

        if (generationStep > constants.totalGenerations) {
            evaluate();
        } else {
            charles.evolve();
            execute();
        }
    }

    function execute() {
        const promises = charles.population.map((n, i) => Player.play(n.id(), generationStep, Player.browsers[i], i));
        Promise.all(promises)
            .then(nextStep)
            .catch((e) => {
                console.log('something bad happened', e);
                nextStep()
            });
    }

    execute();
}

async function close() {
    return await Player.browsers.forEach(async b => await b.close());
}

function stop() {
    process.exit(0);
}

process.on('SIGINT', () => {
    console.log('killing everything');
    close().then(stop);
});

Player.createBrowsers().then(startEvolution);
