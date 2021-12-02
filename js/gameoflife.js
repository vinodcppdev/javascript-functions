function seed() {
  let retArr = [];
  for (let i = 0; i < arguments.length; ++i) {
    retArr.push(arguments[i]);
  }
  return retArr;
}

function same([x, y], [j, k]) {
  if (x === j && y === k)
    return true;
  else
    return false;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  let state = this;
  let found = state.find((liveCell) => { return liveCell[0] === cell[0] && liveCell[1] === cell[1] });
  return found != undefined;
}

const printCell = (cell, state) => {
  let cellAlive = contains.bind(state);
  if (cellAlive(cell)) {
    return '\u25A3';
  }
  else {
    return '\u25A2';
  }
};

function corners(state = []) {
  let maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE, minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
  for (let i = 0; i < state.length; ++i) {
    let cell = state[i];
    if (cell[0] > maxX) {
      maxX = cell[0];
    }
    if (cell[0] < minX) {
      minX = cell[0];
    }
    if (cell[1] > maxY) {
      maxY = cell[1];
    }
    if (cell[1] < minY) {
      minY = cell[1];
    }
  }

  let ret = {
    'topRight': [maxX, maxY],
    'bottomLeft': [minX, minY]
  };
  if (state.length === 0) {
    ret = {
      'topRight': [0, 0],
      'bottomLeft': [0, 0]
    };
  }
  return ret;

}

const printCells = (state) => {
  let rectCorners = corners(state);
  //console.log(rectCorners);
  let retVal = '';
  for (let y = rectCorners.topRight[1]; y >= rectCorners.bottomLeft[1]; --y) {
    for (let x = rectCorners.bottomLeft[0]; x <= rectCorners.topRight[0]; ++x) {
      retVal += printCell([x, y], state);
      retVal += ' ';
    }
    retVal += '\n';
  }
  return retVal;
};

const getNeighborsOf = ([x, y]) => { };

const getLivingNeighbors = (cell, state) => { };

const willBeAlive = (cell, state) => { };

const calculateNext = (state) => { };

const iterate = (state, iterations) => { };

const main = (pattern, iterations) => { };

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3]
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2]
  ]
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;