import Sigmoid from '../math/sigmoid';
import Rectifier from '../math/rectifier';
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
        //const hiddenLayersNum = Math.floor(Math.random() * this.maxHiddenLayers) + this.minHiddenLayers;
        //const hiddenLayers = Array.from({
        //    length: hiddenLayersNum
        //}, () => Math.floor(Math.random() * this.maxNeuronsPerLayer ) + this.minNeuronsPerLayers);
        const hiddenLayersLayout = [3];
        const hiddenActivationFnc = hiddenLayersLayout.map((layer) => new Sigmoid());

        return {
            numOfInputs: this.input,
            numOfOutputs: this.output,
            hiddenLayersLayout,
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

        console.log('breeding');
        const motherParams = mother.getParams();
        const fatherParams = father.getParams();
        /*
        const traverse = (list, action) => {
            for (var i=0; i<list.length; i++) {
                if (Array.isArray(list[i])) {
                    traverse(list[i], action);
                } else {
                    action(list[i]);
                }
            }
        }
        */
        /*
        const _breeding = (acc, key) => {
            acc[key] = Math.floor(Math.random() * 1000) % 2 === 0 ?
                motherParams[key] :
                fatherParams[key];

            return acc;
        }
        */

        const random = () => Math.floor(Math.random() * 1000) % 2 === 0;

        //const firstChildParams = Object.keys(motherParams).reduce(_breeding, {});
        //const secondChildParams = Object.keys(motherParams).reduce(_breeding, {});

        const getRandomValues = () => {
            const weights = {
                inputs: motherParams.weights.inputs.map((value, i) => {
                    random() ? value : fatherParams.weights.inputs[i];
                }),
                hidden: motherParams.weights.hidden.map((l, i) => l.map((value, j) => {
                    random() ? value : fatherParams.weights.hidden[i][j]
                })),
                outputs: motherParams.weights.outputs.map((value, i) => {
                    random() ? value : fatherParams.weights.outputs[i];
                })
            };

            const bias = {
                inputs: motherParams.bias.inputs.map((value, i) => {
                    random() ? value : fatherParams.bias.inputs[i];
                }),
                hidden: motherParams.bias.hidden.map((l, i) => l.map((value, j) => {
                    random() ? value : fatherParams.bias.hidden[i][j]
                })),
                outputs: motherParams.bias.outputs.map((value, i) => {
                    random() ? value : fatherParams.bias.outputs[i];
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
        secondNet.updateWeights(secondChildParams.weights)

        // now we introduce random mutation
        // if (this.mutationChance > Math.random()) {
        //     firstNet = this.mutate(firstNet) || firstNet;
        //     secondNet = his.mutate(secondNet) || secondNet;
        // )

        return [
            this.mutate(firstNet),
            this.mutate(secondNet)
        ];


        // get weights and bias for mother and father
        //const motherParams = mother.getParams();
        //const fatherParams = father.getParams();


        // merge weights and bias for both

        // get params for kids

        // create kids

        // mutate kids

        // return kids



    }

    mutate(net) {
        // const key = ['weights', 'bias'][Math.floor(Math.random() * 2)];;
        //
        // switch(key) {
        //     case 'hiddenLayersLayout':
        //         return net.mutateHiddenLayersLayout();
        //         break;
        //     case 'weights':
        //         return net.mutateWeights();
        //         break;
        //     case 'bias':
        //         return net.mutateBias();
        //         break;
        // }

        console.log('mutationChance', this.mutationChance);

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
        // this should run after execution and when every net has a value

        // evaluate fitness for every network
        //const fitness = population.map((net) => net.getScore());

        // sort based on scores
        const sorted = this.population.sort(this.sortByAccuracy).slice(0, this.population.length);

        // get the number we want to keep for next generation
        const retainedTotal = Math.floor(sorted.length * this.retainPercentage);

        // parents are every network we want to keep
        let parents = sorted.splice(0, retainedTotal);

        // get some of the remainings networks
        sorted.forEach((net) => {
            if (((Math.floor(Math.random()) * 100) % 5) === 0) {
                parents.push(net);
            }
        });

        const desiredLength = this.population.length - parents.length;

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

        this.population = parents;
    }
}
