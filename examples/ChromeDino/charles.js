const B = require('../../dist/B.node');
const constants = require('./constants');

const charles = new B.Darwin({
    count: constants.totalPopulation,
    input: 4,
    output: 2,
    maxHiddenLayers: 5,
    retainPercentage: 0.8,
    mutationChance: 0.3
});

charles.create();

module.exports = charles;
