const blessed = require('blessed');
const contrib = require('blessed-contrib');

const UI = {};

UI.screen = blessed.screen();

UI.grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: UI.screen
});

UI.logger = UI.grid.set(0, 0, 12, 5, contrib.log , {
    fg: 'green',
    label: 'Log',
    height: '100%',
    width: '100%',
    border: {type: "line", fg: "cyan"}
});

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

UI.screen.render();

module.exports = UI;
