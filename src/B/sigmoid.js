import ActivationFunction from "./activationfunction";

export default class Sigmoid extends ActivationFunction {
    
    constructor(v) {
        super(v);
    }

    calc(x) {
        return 1.0 / ( 1.0 + Math.exp(-this.value * x));
    }
}