const B = require('../../dist/B.node');
const constants = require('./constants');

const charles = new B.Darwin({
    count: constants.totalPopulation,
    input: 4,
    output: 2,
    maxHiddenLayers: 5,
    retainPercentage: 0.5,
    mutationChance: 0.5
});

charles.create();

module.exports = charles;
