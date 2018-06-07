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
    fg: 'green',
    label: 'Log',
    border: {type: "line", fg: "cyan"}
});

UI.table = UI.grid.set(0, 5, 12, 7, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Networks',
    border: {type: "line", fg: "cyan"},
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

/*
UI.form = UI.grid.set(0, 5, 4, 5, blessed.form, {
  parent: UI.screen,
  keys: true,
  content: 'Game'
});

UI.start = blessed.button({
  parent: UI.form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  width: 15,
  height: 2,
  left: 10,
  shrink: true,
  name: 'start',
  content: 'start',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

UI.stop = blessed.button({
  parent: UI.form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  width: 15,
  height: 2,
  left: 30,
  shrink: true,
  name: 'stop',
  content: 'stop',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

UI.start.on('press', () => {
    UI.form.submit();
});

UI.stop.on('press', () => {
    UI.form.reset();
});
*/

UI.screen.render();

module.exports = UI;
