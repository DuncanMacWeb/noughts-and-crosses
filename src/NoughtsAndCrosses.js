import { multidimensionalArray } from './utilities/array'

export class NoughtsAndCrosses {
  constructor ({players, view, dimensions = [3, 3], autostart = false}) {
    /*if (dimensions.length > 2) {
      throw new Error('NoughtsAndCrosses doesn’t support more than two dimensions, sorry!');
    }*/

    this.view = view;

    this.gameFinished = false;
    this.players = players;

    this.dimensions = dimensions;
    this.autostart = autostart;

    this.initialize();
  }

  initialize({autostart = false} = {}) {
    this.board = multidimensionalArray(this.dimensions);

    this.view.initialize(this);

    this.currentPlayer = this.players[0];

    if (autostart) {
      this.start();
    }
  }

  getPlayerSymbol(i) {
    const symbols = ['X', 'O', 'Z'],
      len = symbols.length;
    return i < len ? symbols[i] : (i - len).toString();
  }

  async start() {
    try {
      let coords = await this.currentPlayer.move(this, this.view);
      this.doPlayerMove(coords);
    } catch(e) {
      console.error(e)
    }
  }

  restart() {
    this.initialize({autostart: true});
  }

  async doPlayerMove(coords) {
    const playerIndex = this.players.indexOf(this.currentPlayer);
    const playerSymbol = this.getPlayerSymbol(playerIndex);
    let x = coords[0], y = coords[1];
    this.board[x][y] = playerIndex;
    this.view.showMove(coords, playerSymbol);

    if (this.checkWon()) {
      console.log('Player ' + playerSymbol + ' has won');
      this.gameFinished = true;
      return;
    }

    let nextPlayerIndex = (playerIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
    try {
      let coords = await this.currentPlayer.move(this, this.view);
      this.doPlayerMove(coords);
    } catch(e) {
      console.error(e)
    }
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

  checkWon() {
    // horizontals
    for (let y = 0; y < this.dimensions[1]; y++) {
      if (this.board[0][y] !== undefined && (this.board[0][y] === this.board[1][y]) && (this.board[1][y] === this.board[2][y])) {
        let highlightCoords = [];
        for (let x = 0; x < this.dimensions[0]; x++) {
          highlightCoords.push([x, y]);
        }
        this.view.highlightWin(highlightCoords);
        return true;
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
        return true;
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
      return true;
    }
    if (this.board[0][2] !== undefined && (this.board[0][2] === this.board[1][1]) && (this.board[1][1] === this.board[2][0])) {
      let highlightCoords = [];
      let diagLength = this.dimensions[0] < this.dimensions[1] ? this.dimensions[0] : this.dimensions[1];
      for (let i = 0; i < diagLength; i++) {
        highlightCoords.push([i, this.dimensions[1] - i - 1]);
      }
      this.view.highlightWin(highlightCoords);
      return true;
    }

    return false;
  }
}
