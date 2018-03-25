import Layer from './layer';

export default class InputLayer extends Layer {

    constructor(numOfInputs) {
        super(numOfInputs, numOfInputs);
    }
}
