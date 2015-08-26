import { multidimensionalArray } from './utilities/array'

export class NoughtsAndCrosses {
  constructor (players, view, dimensions = [3, 3]) {
    if (dimensions.length > 2) {
      throw new Error('NoughtsAndCrosses doesn’t support more than two dimensions, sorry!');
    }

    this.view = view;

    this.gameFinished = false;
    this.players = players;

    this.dimensions = dimensions;
    this.board = multidimensionalArray(dimensions);

    this.view.initialize(dimensions);

    this.currentPlayer = this.players[0];
  }

  getPlayerSymbol(i) {
    const symbols = ['X', 'O', 'Z'],
      len = symbols.length;
    return i < len ? symbols[i] : (i - len).toString();
  }

  start() {
    this.currentPlayer.move(this, this.view)
      .then((coords) => this.doPlayerMove(coords))
      .catch((e) => console.error(e.stack));
  }

  doPlayerMove(coords) {
    const playerIndex = this.players.indexOf(this.currentPlayer);
    const playerSymbol = this.getPlayerSymbol(playerIndex);
    let x = coords[0], y = coords[1];
    this.board[y][x] = playerIndex;
    this.view.showMove(coords, playerSymbol);

    if (this.checkWon()) {
      console.log('Player ' + playerSymbol + ' has won');
      this.gameFinished = true;
      return;
    }

    let nextPlayerIndex = (playerIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
    this.currentPlayer.move(this, this.view)
      .then((coords) => this.doPlayerMove(coords))
      .catch((e) => console.error(e.stack));
  }

  checkWon() {
    // horizontals
    for (let y = 0; y < this.dimensions[1]; y++) {
      if (this.board[y][0] !== undefined && (this.board[y][0] === this.board[y][1]) && (this.board[y][1] === this.board[y][2])) {
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
      if (this.board[0][x] !== undefined && (this.board[0][x] === this.board[1][x]) && (this.board[1][x] === this.board[2][x])) {
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
