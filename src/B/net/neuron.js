export default class Neuron {

    constructor(numOfInputs, activationFunction) {
        this.output = undefined;
        this.outputBeforeActivation = undefined;

        this.numOfInputs = numOfInputs;
        this.weights = new Array(this.numOfInputs);
        this.inputs = new Array(this.numOfInputs);
        this.bias = 2.0;
        this.activationFunction = activationFunction;
    }

    init() {
        for (var i=0; i <= this.numOfInputs; i++) {

            const newWeight = Math.random();
            this.weights[i] = newWeight;
        }
    }

    calc() {
        let outputBeforeActivation = 0.0;

        if (this.numOfInputs > 0 && this.inputs.length && this.weights.length) {

            for(var i=0; i <= this.numOfInputs; i++) {
                outputBeforeActivation += ( (i === this.numOfInputs) ? this.bias : this.inputs[i]) * this.weights[i];
            }
        }
        this.outputBeforeActivation = outputBeforeActivation;
        this.output= this.activationFunction.calc(this.outputBeforeActivation);
      }

}
