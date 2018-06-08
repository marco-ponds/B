export default class Neuron {

    constructor(numOfInputs, activationFunction) {
        this.output = undefined;

        this.numOfInputs = numOfInputs;
        this.weights = new Array(this.numOfInputs);
        this.inputs = new Array(this.numOfInputs);
        this.bias = Math.random();
        this.activationFunction = activationFunction;
    }

    init() {
        for (var i=0; i <= this.numOfInputs; i++) {

            const newWeight = Math.random();
            this.weights[i] = newWeight;
        }
    }

    updateWeights(weights) {
        for (var i=0; i <= weights.length; i++) {
            if (!isNaN(weights[i])) {
                this.weights[i] = weights[i];
            }
        }
    }

    mutateWeights() {
        for (var i=0; i <= this.weights.length; i++) {
            this.weights[i] += (( Math.random() * 2 ) -1) / 400;
        }
    }

    updateBias(bias) {
        if (!isNaN(bias)) {
            this.bias = bias;
        }
    }

    mutateBias() {
        this.bias += (( Math.random() * 2 ) -1) / 400;
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
