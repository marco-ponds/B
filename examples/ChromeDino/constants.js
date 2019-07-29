module.exports = {
    // population related stuff
    totalPopulation: 6,
    totalGenerations: 100,
    // network related stuff
    input: 4,
    output: 3,
    retainPercentage: 0.5,
    mutationChance: 0.5,
    // defaults
    defaultObstacle: {
        xPos: 0,
        distance: 0,
        yPos: 0,
        width: 0,
        size: 0,
        typeConfig: {
            height: 0
        }
    },
    // who is the best
    //best: 'data/net#684073_0_58523.json'
    // best: 'data/net#503942_0_33968.json'
    best: 'data/net#845982_3_31834.json'
};
