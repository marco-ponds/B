import Neuron from './neuron';

export default class Layer {

    constructor(numOfInputs, numOfNeurons = 0, activationFnc = { calc: f => f}) {
        this.numOfNeurons = numOfNeurons;
        this.neurons = Array.from({ length: this.numOfNeurons });

        this.numOfInputs = numOfInputs;
        this.inputs = Array.from({length: this.numOfInputs});

        this.activationFnc = activationFnc;

        this.outputs = Array.from({length: this.numOfNeurons});

        this.prev = undefined; // previous layer
        this.next = undefined; // next layer
    }

    init() {
        for (var i=0; i<this.numOfNeurons; i++) {
            this.neurons[i] = new Neuron(this.numOfInputs, this.activationFnc);
            this.neurons[i].init();
        }
    }

    calc() {
        for(var i=0; i<this.numOfNeurons; i++) {

            const neuron = this.neurons[i];

            neuron.inputs = this.inputs;
            neuron.calc();

            this.outputs[i] = neuron.output;
        }
    }
}
