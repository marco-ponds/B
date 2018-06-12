const blessed = require('blessed');
const contrib = require('blessed-contrib');

const UI = {};

UI.screen = blessed.screen();

UI.grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: UI.screen
});

UI.logger = UI.grid.set(0, 0, 12, 5, contrib.log, {
    fg: 'white',
    label: 'Log',
    border: {type: "line", fg: "white"}
});

UI.table = UI.grid.set(0, 5, 6, 7, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Networks',
    border: {type: "line", fg: "white"},
    columnSpacing: 10,
    columnWidth: [16, 12, 12, 12]
});

UI.table.focus();


UI.updateTable = function(networks) {
    const headers = ['Name', 'id', 'score', 'dead?'];

    const data = networks.reduce((acc, network, i) => {
        acc.push([
            `net #${i}`,
            network.id(),
            network.getScore(),
            network.data().dead
        ]);

        return acc;
    }, []);

    UI.table.setData({ headers, data });
    UI.screen.render();
}

UI.graph = UI.grid.set(6, 5, 6, 7, contrib.line, {
    xPadding: 1,
    label: 'Average Score',
    numYLabels: 100
});


let data = [];
UI.updateGraph = function(totalGenerations, newAverage) {
    data.push(newAverage);
    UI.graph.setData([
        {
            title: 'score',
            x: Array.from({length: totalGenerations}).map((n, i) => `${i}` ),
            y: data,
            style: {
                line: 'blue'
            }
        }
    ])
}

UI.screen.render();

module.exports = UI;
