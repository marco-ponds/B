import ActivationFunction from "./activationfunction";

export default class Sigmoid extends ActivationFunction {

    calc(x) {
        if (!isNaN(x)) {
            return 1.0 / ( 1.0 + Math.exp(-x));
        }
        return 1;
    }


    derivative(x) {
        return this.calc(x) * (1 - this.calc(x));
    }
}
