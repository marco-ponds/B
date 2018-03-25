import ActivationFunction from "./activationfunction";

export default class Sigmoid extends ActivationFunction {

    constructor(v) {
        super(v);
    }

    calc(x) {
        if (!isNaN(x)) {
            return 1.0 / ( 1.0 + Math.exp(-this.value * x));
        }
        return 1;
    }


    derivative(x) {
        return this.calc(x) * (1 - this.calc(x));
    }
}
