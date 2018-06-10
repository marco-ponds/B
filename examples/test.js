const B = require('../dist/B.node');

var charles = new B.Darwin({
    count: 1,
    input: 4,
    output: 2,
    maxHiddenLayers: 5,
    retainPercentage: 0.8,
    mutationChance: 0.3
});

charles.create();

const first = charles.population[0];
const params = first.getParams();

console.log(params.weights);
const res = {
    w: params.weights,
    b: params.bias,
    l: params.hiddenLayersLayout
};

console.log(JSON.stringify(res));
