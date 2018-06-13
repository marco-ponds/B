import Net from '../net/net';
import Sigmoid from '../math/sigmoid';

export default class Cradle {
    constructor() {}

    parseJSONOptions(json = '{}') {
        let parsed = JSON.parse(json);

        if (parsed.w || parsed.b || parsed.l ) {
            parsed.weights = parsed.w;
            parsed.bias = parsed.b;
            parsed.layout = parsed.l;

            delete parsed.w;
            delete parsed.b;
            delete parsed.l;
        }

        return parsed;
    }

    generate(opts, inputs, outputs) {
        let options = {};
        if (typeof(opts) === 'string') {
            options = this.parseJSONOptions(opts);
        } else {
            options = opts;
        }

        const layout = options.layout || options.l || [];

        const net = new Net({
            numOfInputs: inputs,
            numOfOutputs: outputs,
            hiddenLayersLayout: layout,
            hiddenActivationFnc: layout.map(() => new Sigmoid()),
            outputActivationFnc: new Sigmoid()
        });


        net.updateBias(options.bias || options.b);
        net.updateWeights(options.weights || options.w);

        return net;
    }
}
