import InputLayer from './inputlayer';
import HiddenLayer from './hiddenlayer';
import OutputLayer from './outputlayer';
import Sigmoid from './sigmoid';

export default class Net {
    // public class NeuralNet {
    //     private InputLayer inputLayer; // 
    //     private ArrayList<HiddenLayer> hiddenLayer;
    //     private OutputLayer outputLayer;
    //     private int numOfHiddenLayers;
    //     private int numberOfInputs; ///
    //     private int numberOfOutputs; // 
    //     private ArrayList<Double> input; // 
    //     private ArrayList<Double> output; // 
    // …
    // }

    // public NeuralNet(int numberofinputs,int numberofoutputs,
    //     int [] numberofhiddenneurons,IActivationFunction[] hiddenAcFnc,
    //     IActivationFunction outputAcFnc)    

    constructor(numOfInputs, numOfOutputs, numOfHiddenLayers = [], hiddenActivationFnc = [], ouputActivationFnc) {
        this.numOfInputs = numOfInputs;
        this.numOfOutputs = numOfOutputs;

        this.numOfHiddenLayers = numOfHiddenLayers;
        this.hiddenActivationFnc = hiddenActivationFnc;

        this.hiddenLayers = [];
        this.inputLayer = new InputLayer(this.numOfInputs);

        this.inputs = new Array(this.numOfInputs);
        this.outputs = new Array(this.numOfOutputs);

        this.outputAcFnc = outputActivationFnc;

        this.hiddenLayers = this.createHiddenLayers();
        this.outputLayer = this.createOutputLayer();
    }

    createHiddenLayers() {
        let layers = [];

        let ref = this.inputLayer;

        for (var i=0; i<this.numOfHiddenLayers.length; i++) {
            
            const hidden = new HiddenLayer(ref.numberOfNeurons, this.numOfHiddenLayers[i], this.hiddenActivationFnc[i]);
            ref.next = hidden;
            hidden.prev = ref;

            layers.push(hidden);
            ref = hidden;
        }

        return layers;
    }

    createOutputLayer() {
        let outputLayer;

        if (this.numOfHiddenLayers.length > 0) {

            const inputs = this.hiddenLayers[this.numOfHiddenLayers - 1].numberOfNeurons;

            outputLayer = new OutputLayer(inputs, this.numOfOutputs, this.outputAcFnc );
            outputLayer.prev = this.hiddenLayers[this.numOfHiddenLayers - 1];
            this.hiddenLayers[this.numOfHiddenLayers - 1].next = outputLayer;
          } else {
            outputLayer = new OutputLayer(this.numberofinputs, this.numberofoutputs, this.outputAcFnc);

            this.inputLayer.next = outputLayer;
            outputLayer.prev = this.inputLayer;
        }
        return outputLayer;
    }

    calc() {
        inputLayer.inputs = this.input;
        inputLayer.calc();

        for (var i=0; i<this.numOfHiddenLayers;i++){
            const layer = hiddenLayer[i];
            
            layer.inputs = layer.prev.outputs;
            layer.calc();
        }

        this.outputLayer.inputs(this.outputLayer.prev.outputs);
        this.outputLayer.calc();
        this.output = outputLayer.outputs();
      }
}