import ActivationFunction from "./activationfunction";

export default class Linear extends ActivationFunction {
    
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
