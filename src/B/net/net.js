import InputLayer from './inputlayer';
import HiddenLayer from './hiddenlayer';
import OutputLayer from './outputlayer';
import Sigmoid from '../math/sigmoid';

export default class Net {

    constructor({ numOfInputs, numOfOutputs, hiddenLayersLayout = [], hiddenActivationFnc = [], outputActivationFnc }) {
        this.numOfInputs = numOfInputs;
        this.numOfOutputs = numOfOutputs;

        this.hiddenLayersLayout = hiddenLayersLayout;
        this.numOfHiddenLayers = hiddenLayersLayout.length;
        this.hiddenActivationFnc = hiddenActivationFnc;

        this._id = 'net#' + String(Math.random()).slice(2, 8);

        // this represents our network's score after execution
        this._score = 0;

        // additional data
        this._data = {};

        // doneCalculating is set to false before calculation and true after calculation
        this.doneCalculating = false;

        this.hiddenLayers = [];
        this.inputLayer = new InputLayer(this.numOfInputs);
        this.inputLayer.init();

        this.inputs = Array.from({length: this.numOfInputs});
        this.outputs = Array.from({length: this.numOfOutputs});

        this.outputAcFnc = outputActivationFnc;

        this.hiddenLayers = this.createHiddenLayers(hiddenLayersLayout);
        this.outputLayer = this.createOutputLayer();
    }

    id() {
        return this._id;
    }

    data(key, value) {
        if (key && value) {
            return this._data[key] = value;
        }

        return this._data;
    }

    isEqual(net) {
        return this.id() === net.id();
    }

    setInput(inputs) {
        this.inputs = inputs;
        this.inputLayer.inputs = inputs;
    }

    getParams() {
        return {
            hiddenLayersLayout: this.hiddenLayersLayout,
            hiddenActivationFnc: this.hiddenActivationFnc,
            outputActivationFnc: this.outputAcFnc,
            weights: this.getWeights(),
            bias: this.getBias()
        }
    }

    getWeights() {
        const inputs = this.inputLayer.neurons.map((n) => n.weights);
        const outputs = this.outputLayer.neurons.map((n) => n.weights);
        const hidden = this.hiddenLayers.map((layer) => layer.neurons.map((n) => n.weights));

        return {
            inputs,
            outputs,
            hidden
        };
    }

    getBias() {
        const inputs = this.inputLayer.neurons.map((n) => n.bias);
        const outputs = this.outputLayer.neurons.map((n) => n.bias);
        const hidden = this.hiddenLayers.map((layer) => layer.neurons.map((n) => n.bias));

        return {
            inputs,
            outputs,
            hidden
        };
    }

    updateWeights({ inputs, outputs, hidden }) {
        this.inputLayer.neurons.map((n, i) => n.updateWeights(inputs[i]));
        this.outputLayer.neurons.map((n, i) => n.updateWeights(outputs[i]));
        this.hiddenLayers.map((layer) => layer.neurons.map((n, i) => n.updateWeights(hidden[i][j])));
    }

    updateBias({ inputs, outputs, hidden }) {
        this.inputLayer.neurons.map((n, i) => n.updateBias(inputs[i]));
        this.outputLayer.neurons.map((n, i) => n.updateBias(outputs[i]));
        this.hiddenLayers.map((layer, i) => layer.neurons.map((n, j) => n.updateBias(hidden[i][j])));
    }

    mutateBias(mutationChance) {
        this.inputLayer.neurons.map((n, i) => n.mutateBias(mutationChance));
        this.outputLayer.neurons.map((n, i) => n.mutateBias(mutationChance));
        this.hiddenLayers.map((layer) => layer.neurons.map((n) => n.mutateBias(mutationChance)));

        return this;
    }

    mutateWeights(mutationChance) {
        this.inputLayer.neurons.map((n, i) => n.mutateWeights(mutationChance));
        this.outputLayer.neurons.map((n, i) => n.mutateWeights(mutationChance));
        this.hiddenLayers.map((layer) => layer.neurons.map((n) => n.mutateWeights(mutationChance)));

        return this;
    }

    mutateHiddenLayersLayout() {
        const values = this.hiddenLayersLayout;
        let newLayout = Array.from({length: Math.floor(Math.random() * values.length) + 5}).forEach((el, i) => {
            if (values[i]) {
                el[i] = values[i] + Math.floor(( Math.random() * 4 ) - 2);
            } else {
                el[i] = Math.floor(Math.random() * 500 ) + 1;
            }
        });

        this.hiddenLayersLayout = newLayout;
        this.numOfHiddenLayers = newLayout.length;
        this.hiddenLayers = this.createHiddenLayers(newLayout);
        this.outputLayer = this.createOutputLayer();
        this.hiddenActivationFnc = newLayout.map((layer) => new Sigmoid());

        return this;
    }

    createHiddenLayers(hiddenLayersLayout) {
        let layers = [];

        let ref = this.inputLayer;

        for (var i=0; i<hiddenLayersLayout.length; i++) {

            const hidden = new HiddenLayer(ref.numOfNeurons, hiddenLayersLayout[i], this.hiddenActivationFnc[i]);
            ref.next = hidden;
            hidden.prev = ref;
            layers.push(hidden);

            hidden.init();
            ref = hidden;
        }

        return layers;
    }

    getScore() {
        return this._score;
    }

    setScore(score = 0) {
        this._score = score;
    }

    isCalculationDone() {
        return this.doneCalculating;
    }

    createOutputLayer() {
        let outputLayer;

        if (this.numOfHiddenLayers > 0) {

            const inputs = this.hiddenLayers[this.numOfHiddenLayers - 1].numOfNeurons;

            outputLayer = new OutputLayer(inputs, this.numOfOutputs, this.outputAcFnc );
            outputLayer.prev = this.hiddenLayers[this.numOfHiddenLayers - 1];
            this.hiddenLayers[this.numOfHiddenLayers - 1].next = outputLayer;
          } else {
            outputLayer = new OutputLayer(this.numOfInputs, this.numOfOutputs, this.outputAcFnc);

            this.inputLayer.next = outputLayer;
            outputLayer.prev = this.inputLayer;
        }
        outputLayer.init();
        return outputLayer;
    }

    calc() {
        this.doneCalculating = false;
        this.inputLayer.calc();

        for (var i=0; i<this.numOfHiddenLayers;i++){
            const layer = this.hiddenLayers[i];

            layer.inputs = layer.prev.outputs;
            layer.calc();
        }

        this.outputLayer.inputs = this.outputLayer.prev.outputs;
        this.outputLayer.calc();
        this.outputs = this.outputLayer.outputs;
        this.doneCalculating = false;

        return this.outputs;
    }

    toJSON() {
        const params = this.getParams();
        return JSON.stringify({
            w: params.weights,
            b: params.bias,
            l: params.hiddenLayersLayout
        });
    }
}
