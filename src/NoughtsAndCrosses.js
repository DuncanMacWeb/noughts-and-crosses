import { multidimensionalArray } from './utilities/array'

export class NoughtsAndCrosses {
  constructor ({players, view, dimensions = [3, 3], autostart = false}) {
    /*if (dimensions.length > 2) {
      throw new Error('NoughtsAndCrosses doesn’t support more than two dimensions, sorry!');
    }*/

    this.view = view;

    this.players = players;

    this.results = {};
    this.results.numWins = players.map(p => 0);
    this.results.numDraws = 0;

    this.dimensions = dimensions;

    this.initialize({autostart: autostart});
  }

  initialize({autostart = false} = {}) {
    this.gameFinished = false;

    this.board = multidimensionalArray(this.dimensions);

    this.view.initialize(this);

    this.currentPlayer = this.players[0];

    this.maxMoves = this.dimensions.reduce((val, acc) => val * acc);
    this.movesPlayed = 0;

    if (autostart) {
      this.run();
    }
  }

  getPlayerSymbol(i) {
    // After using the characters in 'symbols', we
    // use numbers starting from 1. (1, 2, 3 etc)
    // Start from 1 because '0' is confused with 'O'.
    const symbols = ['X', 'O', 'Z'],
      len = symbols.length;
    return i < len ? symbols[i] : (i + 1 - len).toString();
  }

  async run() {
    try {
      let playerIndex, nextPlayerIndex, coords;
      while (!this.gameFinished) {
        playerIndex = this.players.indexOf(this.currentPlayer);
        coords = await this.currentPlayer.move(this, this.view);
        if (this.validMove(coords)) {
          this.move(this.currentPlayer, coords);
          switch (this.checkWinStatus()) {
            case 'win':
              this.results.numWins[playerIndex]++;
              this.view.log(`Player ${this.getPlayerSymbol(playerIndex)} has won! They have won ${this.results.numWins[playerIndex]} games so far`);
              this.gameFinished = true;
              return;
            case 'draw':
              this.results.numDraws++;
              this.view.log(`The game is a draw! ${this.results.numDraws} draws so far.`);
              this.gameFinished = true;
              return;
            case 'continue':
              nextPlayerIndex = (playerIndex + 1) % this.players.length;
              this.currentPlayer = this.players[nextPlayerIndex];
              continue;
            default:
              throw new Error('Unhandled win state');
          }
        } else {
          this.view.error('Sorry, you can’t move there!');
        }
      }
    } catch (e) {
      console.error(e.stack);
      throw e;
    }
  }

  /* for (move in this.moves()) {
    this.checkWinStatus() ? 
  } */

  restart() {
    this.initialize({autostart: true});
  }

  validMove(coords) {
    let x = coords[0], y = coords[1];
    return this.board[x][y] === undefined;
  }

  move(player, coords) {
    let playerIndex = this.players.indexOf(player);
    const playerSymbol = this.getPlayerSymbol( playerIndex );
    let x = coords[0], y = coords[1];
    this.board[x][y] = playerIndex;
    this.view.showMove(coords, playerSymbol);
    this.movesPlayed++;
  }

  getCellByLinearIndex = i => this.getCellByCoords(this.getCoordinatesByLinearIndex(i))

  getCellByCoords(coords) {
    // this.board = multidimensionalArray with least-significant dimension first [x, y, z]
    // this.getCoordinatesByLinearIndex returns a least-significant-dimension first array
    // return this.board[...[this.getCoordinatesByLinearIndex(i)]]
    if (coords.length !== this.dimensions.length) {
      throw new Error(`Co-ordinates passed to getCellByCoords not the same length (${coords.length}) as the number of dimensions (${this.dimensions.length})`)
    }

    let _gcbc = (board, coords) => coords.length > 1 ?
        _gcbc(board[ coords.shift() ], coords) : // use the least-significant coord
        board[coords[0]]; // last dimension -- return value at remaining coord

    return _gcbc(this.board, coords);
  }

  getCoordinatesByLinearIndex(i) {
    // Loop over the dimensions from the last to the first.
    // For each dimension, we calculate the 'dimFactor' which is the multiplier
    // that was used to calculate that part of the linear coordinate
    //
    // E.g.
    // For a 3x3x3 game, the linear coord = z*9 + y*3 + x
    // so the dimFactor for the z dimension is 9.
    //
    // to get 'z' back, we find out how many multiples of 9 there are
    // with Math.floor(i / dimFactor)
    // then since we have used that part of the linear coord, we can modulus the
    // linear coord by dimFactor for our next dimension...
    //
    let coords = new Array(this.dimensions.length);
    for (let d = this.dimensions.length - 1; d > 0; d--) {
      let dimFactor = this.dimensions.slice(0, d).reduce((acc, val) => acc * val);
      coords[d] = Math.floor(i / dimFactor);
      i = i % dimFactor;
    }
    coords[0] = i;
    return coords;
  }

  checkWinStatus() {
    // horizontals
    for (let y = 0; y < this.dimensions[1]; y++) {
      if (this.board[0][y] !== undefined && (this.board[0][y] === this.board[1][y]) && (this.board[1][y] === this.board[2][y])) {
        let highlightCoords = [];
        for (let x = 0; x < this.dimensions[0]; x++) {
          highlightCoords.push([x, y]);
        }
        this.view.highlightWin(highlightCoords);
        return 'win';
      }
    }

    // verticals
    for (let x = 0; x < this.dimensions[0]; x++) {
      if (this.board[x][0] !== undefined && (this.board[x][0] === this.board[x][1]) && (this.board[x][1] === this.board[x][2])) {
        let highlightCoords = [];
        for (let y = 0; y < this.dimensions[1]; y++) {
          highlightCoords.push([x, y]);
        }
        this.view.highlightWin(highlightCoords);
        return 'win';
      }
    }

    // diagonals
    if (this.board[0][0] !== undefined && (this.board[0][0] === this.board[1][1]) && (this.board[1][1] === this.board[2][2])) {
      let highlightCoords = [];
      let diagLength = this.dimensions[0] < this.dimensions[1] ? this.dimensions[0] : this.dimensions[1];
      for (let i = 0; i < diagLength; i++) {
        highlightCoords.push([i, i]);
      }
      this.view.highlightWin(highlightCoords);
      return 'win';
    }
    if (this.board[0][2] !== undefined && (this.board[0][2] === this.board[1][1]) && (this.board[1][1] === this.board[2][0])) {
      let highlightCoords = [];
      let diagLength = this.dimensions[0] < this.dimensions[1] ? this.dimensions[0] : this.dimensions[1];
      for (let i = 0; i < diagLength; i++) {
        highlightCoords.push([i, this.dimensions[1] - i - 1]);
      }
      this.view.highlightWin(highlightCoords);
      return 'win';
    }

    if (this.movesPlayed >= this.maxMoves) {
      return 'draw';
    }

    return 'continue';
  }
}
