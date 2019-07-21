import Sigmoid from '../math/sigmoid';
import Rectifier from '../math/rectifier';
import Net from '../net/net';
import Cradle from './cradle';

export default class Darwin {

    constructor({
            count,
            input,
            output,
            hiddenLayersLayout,
            outputActivationFnc,
            hiddenActivationFnc,
            retainPercentage,
            mutationChance }) {

        this.input = input;
        this.output = output;
        this.count = count;
        this.population = [];
        //this.minHiddenLayers = maxHiddenLayers;
        this.hiddenLayersLayout = hiddenLayersLayout;
        this.outputActivationFnc = new outputActivationFnc();
        this.hiddenActivationFnc = hiddenActivationFnc;

        this.mutationChance = mutationChance;
        this.retainPercentage = retainPercentage;

        this.cradle = new Cradle();
    }

    generateRandomParams() {
        //const hiddenLayersLayout = [3];
        const hiddenActivationFnc = this.hiddenLayersLayout.map(() => new this.hiddenActivationFnc());

        return {
            numOfInputs: this.input,
            numOfOutputs: this.output,
            hiddenLayersLayout: this.hiddenLayersLayout,
            hiddenActivationFnc,
            outputActivationFnc: this.outputActivationFnc
        };
    }

    create(json) {
        this.population = [];
        for (var i=0; i<this.count; i++) {
            if (json) {
                this.population.push(this.cradle.generate(json, this.input, this.output));
            } else {
                this.population.push(new Net(this.generateRandomParams()));
            }
        }

        return this.population;
    }

    getNetwork(networkId) {
        return this.population.filter((n) => n.id() === networkId)[0];
    }

    getAverageScore() {
        return this.population.reduce((total, net) => {
            total += net.getScore();

            return total;
        }, 0) / this.population.length;
    }

    breed(mother, father) {

        const motherParams = mother.getParams();
        const fatherParams = father.getParams();

        const random = () => Math.floor(Math.random() * 1000) % 2 === 0;

        const getRandomValues = () => {
            const weights = {
                inputs: motherParams.weights.inputs.map((value, i) => {
                    return random() ? value : fatherParams.weights.inputs[i];
                }),
                hidden: motherParams.weights.hidden.map((l, i) => l.map((value, j) => {
                    return random() ? value : fatherParams.weights.hidden[i][j]
                })),
                outputs: motherParams.weights.outputs.map((value, i) => {
                    return random() ? value : fatherParams.weights.outputs[i];
                })
            };

            const bias = {
                inputs: motherParams.bias.inputs.map((value, i) => {
                    return random() ? value : fatherParams.bias.inputs[i];
                }),
                hidden: motherParams.bias.hidden.map((l, i) => l.map((value, j) => {
                    return random() ? value : fatherParams.bias.hidden[i][j]
                })),
                outputs: motherParams.bias.outputs.map((value, i) => {
                    return random() ? value : fatherParams.bias.outputs[i];
                })
            };

            return {
                weights,
                bias
            }
        }

        let firstNet = new Net({
            numOfInputs: this.input,
            numOfOutputs: this.output,
            ...motherParams
        });

        let secondNet = new Net({
            numOfInputs: this.input,
            numOfOutputs: this.output,
            ...motherParams
        });

        const firstChildParams = getRandomValues();
        const secondChildParams = getRandomValues();

        firstNet.updateBias(firstChildParams.bias);
        firstNet.updateWeights(firstChildParams.weights);
        secondNet.updateBias(secondChildParams.bias);
        secondNet.updateWeights(secondChildParams.weights);

        return [
            this.mutate(firstNet),
            this.mutate(secondNet)
        ];
    }

    mutate(net) {
        net.mutateBias(this.mutationChance);
        net.mutateWeights(this.mutationChance);

        return net;

    }

    sortByAccuracy(netA, netB) {
        const accuracyA = netA.getScore();
        const accuracyB = netB.getScore();

        if (accuracyA > accuracyB) return -1;
    	if (accuracyA < accuracyB) return 1;

    	return 0;
    }

    evolve() {

        const sorted = this.population.sort(this.sortByAccuracy).slice(0, this.population.length);
        const retainedTotal = Math.floor(sorted.length * this.retainPercentage);

        let parents = sorted.splice(0, retainedTotal);
        const missingKids = this.population.length - parents.length;

        let children = [];

        while (children.length < missingKids) {
            const dad = parents[Math.floor(Math.random() * parents.length)];
            const mom = parents[Math.floor(Math.random() * parents.length)];

            if (!mom.isEqual(dad)) {

                const babies = this.breed(mom, dad);

                babies.forEach((baby) => {
                    if (children.length < missingKids) {
                        children.push(baby);
                    }
                });
            }
        }

        parents = parents.concat(children);

        this.population = parents;

        return this.population;
    }
}
