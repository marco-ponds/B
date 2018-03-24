import Layer from './layer';

export default class OutputLayer extends Layer {

    constructor(numOfInputs, numOfNeurons, activationFnc) {
        super(numOfInputs, numOfNeurons, activationFnc);
    }
}
