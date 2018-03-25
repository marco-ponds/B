import ActivationFunction from './activationfunction';

export default class Hypertan extends ActivationFunction {

    constructor(v) {
        super(v);
    }

    calc(x) {
        if (!isNaN(x)) {
            return (1.0 - Math.exp(-this.value * x)) / (1.0 + Math.exp(-this.value * x));
        }

        return this.value;
    }

    derivative(x){
        return (1.0) - Math.pow(this.calc(x), 2.0);
    }
}
