import Layer from './layer';

export default class HiddenLayer extends Layer {

    constructor(numOfInputs, numOfNeurons, activationFnc) {
        super(numOfInputs, numOfNeurons, activationFnc);
    }
}