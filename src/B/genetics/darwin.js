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
        console.log('\n\n\n');

        const motherParams = mother.getParams();
        const fatherParams = father.getParams();

        console.log('got mother and father params');
        console.log('\n\n\n');
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

        console.log('creating the first kid');
        console.log('\n\n\n');

        let secondNet = new Net({
            numOfInputs: this.input,
            numOfOutputs: this.output,
            ...motherParams
        });

        console.log('creating ths second kid');
        console.log('\n\n\n');

        const firstChildParams = getRandomValues();
        const secondChildParams = getRandomValues();

        console.log('got params', secondChildParams);
        console.log('\n\n\n');

        console.log('got params', firstChildParams);
        console.log('\n\n\n');

        firstNet.updateBias(firstChildParams.bias);
        firstNet.updateWeights(firstChildParams.weights);
        secondNet.updateBias(secondChildParams.bias);
        secondNet.updateWeights(secondChildParams.weights)

        console.log('done updating bias and weithgs for both kids');
        console.log('\n\n\n');

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

        console.log('we are mutating a net ', this.mutationChance);
        console.log('\n\n\n');

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
        console.log('evolving\n\n\n');
        // this should run after execution and when every net has a value

        // evaluate fitness for every network
        //const fitness = population.map((net) => net.getScore());

        // sort based on scores
        const sorted = this.population.sort(this.sortByAccuracy).slice(0, this.population.length);
        console.log('sorted population', sorted);
        console.log('\n\n\n');

        // get the number we want to keep for next generation
        const retainedTotal = Math.floor(sorted.length * this.retainPercentage);
        console.log('retaining index ', retainedTotal);
        console.log('\n\n\n');

        // parents are every network we want to keep
        let parents = sorted.splice(0, retainedTotal);
        console.log('parents ', parents);
        console.log('\n\n\n');

        // get some of the remainings networks
        // sorted.forEach((net) => {
        //     if (((Math.floor(Math.random()) * 100) % 5) === 0) {
        //         parents.push(net);
        //     }
        // });
        console.log('parents after picking remainings nets ', parents);
        console.log('\n\n\n');

        const missingKids = this.population.length - parents.length;
        console.log(`missingKids ${missingKids} , populationlength ${this.population.length}, parents length ${parents.length}`);
        console.log('\n\n\n');

        // now creating a new population breeding parents
        let children = [];

        console.log('children length ', children.length);
        console.log('\n\n\n');

        while (children.length < missingKids) {
            // get random mom and dad
            const dad = parents[Math.floor(Math.random() * parents.length)];
            const mom = parents[Math.floor(Math.random() * parents.length)];

            console.log('getting mom and dad');
            console.log('\n\n\n');

            if (!mom.isEqual(dad)) {
                console.log('mom and dad are not equal');
                console.log('\n\n\n');

                const babies = this.breed(mom, dad);
                console.log('done breeding ', children.length, babies.length);
                console.log('\n\n\n');

                babies.forEach((baby) => {
                    if (children.length < missingKids) {
                        console.log('adding babies to population');
                        console.log('\n\n\n');
                        children.push(baby);
                    }
                });
            }
        }
        // now adding children to parents gorup
        parents = parents.concat(children);
        console.log('adding children to parents, ', parents.length);
        console.log('\n\n\n');

        this.population = parents;

        return this.population;
    }
}
