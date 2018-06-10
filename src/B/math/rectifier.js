import ActivationFunction from "./activationfunction";

export default class Rectifier extends ActivationFunction {

    calc(x) {
        if (!isNaN(x)) {
            return Math.max(0, x);
        }
        return 0;
    }


    derivative(x) {
        return 1;
    }
}
