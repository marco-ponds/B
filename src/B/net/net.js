import InputLayer from './inputlayer';
import HiddenLayer from './hiddenlayer';
import OutputLayer from './outputlayer';
import Sigmoid from '../math/sigmoid';

export default class Net {

    constructor(numOfInputs, numOfOutputs, hiddenLayers = [], hiddenActivationFnc = [], outputActivationFnc) {
        this.numOfInputs = numOfInputs;
        this.numOfOutputs = numOfOutputs;

        this.numOfHiddenLayers = hiddenLayers.length;
        this.hiddenActivationFnc = hiddenActivationFnc;

        this.hiddenLayers = [];
        this.inputLayer = new InputLayer(this.numOfInputs);
        this.inputLayer.init();

        this.inputs = new Array(this.numOfInputs);
        this.outputs = new Array(this.numOfOutputs);

        this.outputAcFnc = outputActivationFnc;

        this.hiddenLayers = this.createHiddenLayers(hiddenLayers);
        this.outputLayer = this.createOutputLayer();
    }

    createHiddenLayers(hiddenLayers) {
        let layers = [];

        let ref = this.inputLayer;

        for (var i=0; i<hiddenLayers.length; i++) {

            const hidden = new HiddenLayer(ref.numOfNeurons, hiddenLayers[i], this.hiddenActivationFnc[i]);
            ref.next = hidden;
            hidden.prev = ref;
            layers.push(hidden);

            hidden.init();
            ref = hidden;
        }

        return layers;
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
        this.inputLayer.inputs = this.inputs;
        this.inputLayer.calc();

        for (var i=0; i<this.numOfHiddenLayers;i++){
            const layer = this.hiddenLayers[i];

            layer.inputs = layer.prev.outputs;
            layer.calc();
        }

        this.outputLayer.inputs = this.outputLayer.prev.outputs;
        this.outputLayer.calc();
        this.outputs = this.outputLayer.outputs;
      }
}
