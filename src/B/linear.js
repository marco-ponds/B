import ActivationFunction from "./activationfunction";

export default class Linear extends ActivationFunction {
    
    constructor(v) {
        super(v);
    }

    calc(x) {
        if (!isNaN(x)) {
            return x;
        }
        return 1;
    }
}
