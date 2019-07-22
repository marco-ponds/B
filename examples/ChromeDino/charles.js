const B = require('../../dist/B.node');
const constants = require('./constants');

const fs = require('fs');
const path = require('path');

const charles = new B.Darwin({
    count: constants.totalPopulation,
    input: constants.input,
    output: constants.output,
    retainPercentage: constants.retainPercentage,
    mutationChance: constants.mutationChance,
    hiddenLayersLayout: [],
    outputActivationFnc: B.Sigmoid,
    hiddenActivationFnc: B.Sigmoid
});

const filename = path.join(__dirname, 'data/net#949968_13_24483.json');
const json = fs.readFileSync(filename, 'utf8');

charles.create(json);

module.exports = charles;
