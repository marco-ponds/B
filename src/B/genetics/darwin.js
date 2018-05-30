import Sigmoid from '../math/sigmoid';
import Net from '../net/net';

export default class Darwin {

    constructor({ count, input, output, maxHiddenLayers, retainPercentage, mutationChance }) {
        this.input = input;
        this.output = output;
        this.count = count; // number of networks to generate ( size of population )
        this.population = [];
        this.minHiddenLayers = maxHiddenLayers;
        this.minNeuronsPerLayer = 1;
        this.maxNeuronsPerLayer = 500;

        this.mutationChance = mutationChance;

        // retainPercentage ( percentage of population we want to keep during evolution )
        this.retainPercentage = retainPercentage;
    }

    generateRandomParams() {
        const hiddenLayersNum = Math.floor(Math.random() * this.maxHiddenLayers) + this.minHiddenLayers;
        const hiddenLayers = Array.from({
            length: hiddenLayersNum
        }, () => Math.floor(Math.random() * this.maxNeuronsPerLayer ) + this.minNeuronsPerLayers);
        const hiddenActivationFnc = hiddenLayers.map((layer) => new Sigmoid());

        return {
            numOfInputs: this.input,
            numOfOutputs: this.output,
            hiddenLayers,
            hiddenActivationFnc,
            outputActivationFnc: new Sigmoid()
        };
    }

    create() {
        this.population = [];
        for (var i=0; i<this.count; i++) {
            const net = new Net(this.generateRandomParams());
            this.population.push(net);
        }
    }

    breed(mother, father) {
        const motherParams = mother.getParams();
        const fatherParams = father.getParams();

        const _breeding = (acc, key) => {
            acc[key] = Math.floor(Math.random() * 1000) % 2 === 0 ?
                motherParams[key] :
                fatherParams[key];

            return acc;
        }

        const firstChildParams = Object.keys(motherParams).reduce(_breeding, {});
        const secondChildParams = Object.keys(motherParams).reduce(_breeding, {});

        let firstNet = new Net({
            numOfInputs: this.input,
            numOfOutputs: this.output,
            ...firstChildParams
        });

        let secondNet = new Net({
            numOfInputs: this.input,
            numOfOutputs: this.output,
            ...secondChildParams
        });

        firstNet.updateBias(firstChildParams.bias);
        firstNet.updateWeights(firstChildParams.weights);
        secondNet.updateBias(secondChildParams.bias);
        secondNet.updateWeights(secondChildParams.weights)

        // now we introduce random mutation
        if (this.mutationChance > Math.random()) {
            firstNet = this.mutate(firstNet) || firstNet;
            secondNet = his.mutate(secondNet) || secondNet;
        }

        return [
            firstNet,
            secondNet
        ];
    }

    mutate(net) {
        const key = ['hiddenLayersLayout', 'weights', 'bias'][Math.floor(Math.random() * 3)];;

        switch(key) {
            case 'hiddenLayersLayout':
                return net.mutateHiddenLayersLayout();
                break;
            case 'weights':
                return net.mutateWeights();
                break;
            case 'bias':
                return net.mutateBias();
                break;
        }

    }

    sortByAccuracy(accuracyA, accuracyB) {

        if (accuracyA > accuracyB) return -1;
    	if (accuracyA < accuracyB) return 1;

    	return 0;
    }

    evolve(population = []) {
        // this should run after execution and when every net has a value

        // evaluate fitness for every network
        const fitness = population.map((net) => net.getScore());

        // sort based on scores
        const sorted = fitness.sort(this.sortByAccuracy);

        // get the number we want to keep for next generation
        const retainedTotal = Math.floor(sorted.lngth * this.retainPercentage);

        // parents are every network we want to keep
        let parents = sorted.splice(0, retainedTotal);

        // get some of the remainings networks
        sorted.forEach((net) => {
            if (((Math.floor(Math.random()) * 100) % 5) === 0) {
                parents.push(net);
            }
        });

        const desiredLength = population.length - parents.length;

        // now creating a new population breeding parents
        let children = [];

        while (children.length < desiredLength) {
            // get random mom and dad
            const dad = parents[Math.floor(Math.random() * parents.length)];
            const mom = parents[Math.floor(Math.random() * parents.length)];

            if (!mom.isEqual(dad)) {
                const babies = this.breed(mom, dad);

                babies.forEach((baby) => {
                    if (children.length < desiredLength) {
                        children.push(baby);
                    }
                });
            }
        }
        // now adding children to parents gorup
        parents.concat(children);

        return parents;
    }
}