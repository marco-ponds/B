import PT from './trainer';
import ErrorMeasurement from './errorMeasurement';

export default class DeltaRule extends PT {

    // error [[]] è una matrice
    constructor(error, generalError, overallError, overallGeneralError) {
        super();
        /*
        this.degrees = {
            generalError: 0.0,
            overallError: 2.0
        };

        this.error = error;
        this.generalError = [];
        this.overallError = [];
        this.overallGeneralError = overallGeneralError;

        this.measurements = {
            generalError: ErrorMeasurement.SQUARE_ERROR,
            overallError: ErrorMeasurement.MSE
        };

        this.currentRecord = 0;
        this.newWeights = []; // new weights is a matrix of a matric ( every neuron has a list of weights)
        */
    }
}
