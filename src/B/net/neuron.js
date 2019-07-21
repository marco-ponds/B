export default class Neuron {

    constructor(numOfInputs, activationFunction) {
        this.output = undefined;

        this.numOfInputs = numOfInputs;
        this.weights = Array(this.numOfInputs);
        this.inputs = Array(this.numOfInputs).fill(0);
        this.bias = Math.random();
        this.activationFunction = activationFunction;
    }

    init() {
        for (var i=0; i <= this.numOfInputs; i++) {
            this.weights[i] = Math.random();;
        }
    }

    updateWeights(weights) {
        for (var i=0; i <= weights.length; i++) {
            if (!isNaN(weights[i])) {
                this.weights[i] = weights[i];
            }
        }
    }

    mutateWeights(mutationChance) {
        for (var i=0; i <= this.weights.length; i++) {
            if (mutationChance > Math.random()) {
                //this.weights[i] += (( Math.random() * 2 ) -1) / 50;
                this.weights[i] += Math.random() - .5;
            }
        }
    }

    updateBias(bias) {
        if (!isNaN(bias)) {
            this.bias = bias;
        }
    }

    mutateBias(mutationChance) {
        if (mutationChance > Math.random()) {
            //this.bias += (( Math.random() * 2 ) -1) / 50;
            this.bias += Math.random() - .5;
        }
    }

    calc() {
        let outputBeforeActivation = 0.0;

        if (this.numOfInputs > 0 && this.inputs.length && this.weights.length) {

            for(var i=0; i <= this.numOfInputs; i++) {
                outputBeforeActivation += ( (i === this.numOfInputs) ? this.bias : this.inputs[i]) * this.weights[i];
            }
        }
        this.output = this.activationFunction.calc(outputBeforeActivation);
      }

}
