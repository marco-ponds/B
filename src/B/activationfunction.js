export default class ActivationFunction {

    constructor(v) {
        this.value = v;
    }

    static types() {
        return {
            STEP: 0,
            LINEAR: 1,
            SIGMOID: 2,
            HYPERTAN: 3
        }
    }
}