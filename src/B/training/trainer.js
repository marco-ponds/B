export default class PT {

    static LearningMode() {
        return {
            ONLINE: 0,
            BATCH: 1
        };
    }

    static LearningParadigm() {
        return {
            SUPERVISED: 0,
            UNSUPERVISED: 1
        };
    }

    constructor(net, trainingDataSet, testingDataSet, validatingDataSet) {
        this.net = net;

        this.maxEpochs = 100;
        this.epoch = 0;
        this.minOverallError = 0.001;

        this.learningRate = 0.1;
        this.datasets = {
            training: trainingDataSet,
            testing: testingDataSet,
            validating: validatingDataSet
        };

        this.printTraining = false;
    }

    train() {

    }

    forward(step) {

    }

    calcWeights(layer, input, neuron, error = 0) {

    }
}
