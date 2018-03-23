import Neuron from './neuron';

export default class Layer {

    constructor(numberOfInputs, numberOfNeurons = 0, activationFnc = { calc: f => f}) {
        this.numberOfNeurons = numberOfNeurons;
        this.neurons = new Array(this.numberOfNeurons);
        
        this.numberOfInputs = numberOfInputs;
        this.inputs = new Array(this.numberOfInputs);
        
        this.activationFnc = activationFnc;

        this.outputs = new Array(this.numberOfNeurons);

        this.prev = undefined; // previous layer
        this.next = undefined; // next layer
    }

    init() {
        for (var i=0; i<this.numberOfNeurons; i++) {
            this.neurons[i] = new Neuron(this.numberOfInputs, this.activationFnc);
            this.neurons[i].init();
        }
    }

    calc() {
        for(var i=0; i<this.numberOfNeurons; i++) {

            const neuron = this.neurons[i];

            neuron.inputs = this.inputs;
            neuron.calc();

            this.outputs[i] = neuron.output;
        }
    }
}