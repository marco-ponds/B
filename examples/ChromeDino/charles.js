const B = require('../../dist/B.node');
const constants = require('./constants');

const fs = require('fs');
const path = require('path');

const charles = new B.Darwin({
    count: constants.totalPopulation,
    input: 3,
    output: 2,
    hiddenLayersLayout: [],
    outputActivationFnc: B.Sigmoid,
    hiddenActivationFnc: B.Sigmoid,
    retainPercentage: 0.5,
    mutationChance: 0.5
});

const filename = path.join(__dirname, 'data/net#296455_22_18183.json');
const json = fs.readFileSync(filename, 'utf8');

charles.create();

module.exports = charles;
