export default class Neuron {

    constructor(numOfInputs, activationFunction) {        
        this.output = undefined;
        this.outputBeforeActivation = undefined;
        
        this.numOfInputs = numOfInputs;
        this.weights = new Array(this.numOfInputs);
        this.inputs = new Array(this.numOfInputs);
        this.bias = 1.0;
        this.activationFunction = activationFunction;
    }

    init() {
        for (var i=0; i <= this.numberOfInputs; i++) {
            
            const newWeight = Math.random();
            this.weights[i] = newWeight;
        }
    }

    calc() {
        let outputBeforeActivation = 0.0;

        if (this.numberOfInputs > 0 && this.inputs.length && this.weights.length) {

            for(var i=0; i <= this.numberOfInputs; i++) {
                this.outputBeforeActivation += ( (i === this.numberOfInputs) ? this.bias : this.inputs[i]) * this.weight[i];
            }
        }

        this.output= this.activationFunction.calc(this.outputBeforeActivation);
      }

}