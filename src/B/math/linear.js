import ActivationFunction from "./activationfunction";

export default class Linear extends ActivationFunction {

    constructor(v) {
        super(v);
    }

    calc(x) {
        if (!isNaN(x)) {
            return this.value * x;
        }
        return this.value;
    }

    derivative(x) {
        return this.value;
    }
}
