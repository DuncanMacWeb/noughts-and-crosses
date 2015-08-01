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
    this.game = multidimensionalArray(dimensions);

    this.view.initPlayCallback(this.onPlay);

    this.view.initialize(dimensions);

    this.currentPlayer = this.players[0];
    currentPlayer.move().then(this.doPlayerMove);
  }

  getPlayerSymbol(i) {
    const symbols = ['X', 'O', 'Z'],
      len = symbols.length;
    return i < len ? symbols[i] : (i - len).toString();
  }

  doPlayerMove(coords) {
    let playerSymbol = this.getPlayerSymbol(this.playersTurn);
    this.game[y][x] = playerSymbol;
    this.view.showMove(coords, playerSymbol);

    if (this.checkWon()) {
      this.gameFinished = true;
      return;
    }

    let nextPlayerIndex = (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
    this.currentPlayer.move().then(this.doPlayerMove);
  }

  checkWon() {
    // horizontals
    for (var y = 0; y < this.dimensions[1]; y++) {
      if (this.game[y][0] !== undefined && (this.game[y][0] === this.game[y][1]) && (this.game[y][1] === this.game[y][2])) {
        let highlightCoords = [];
        for (let x = 0; x < this.dimensions[0]; x++) {
          highlightCoords.push([x, y]);
        }
        this.view.highlightWin(highlightCoords);
        return true;
      }
    }

    // verticals
    for (var x = 0; x < this.dimensions[0]; x++) {
      if (this.game[0][x] !== undefined && (this.game[0][x] === this.game[1][x]) && (this.game[1][x] === this.game[2][x])) {
        let highlightCoords = [];
        for (let y = 0; y < this.dimensions[1]; y++) {
          highlightCoords.push([x, y]);
        }
        this.view.highlightWin(highlightCoords);
        return true;
      }
    }

    // diagonals
    if (this.game[0][0] !== undefined && (this.game[0][0] === this.game[1][1]) && (this.game[1][1] === this.game[2][2])) {
      let highlightCoords = [];
      let diagLength = this.dimensions[0] < this.dimensions[1] ? this.dimensions[0] : this.dimensions[1];
      for (let i = 0; i < diagLength; i++) {
        highlightCoords.push([i, i]);
      }
      this.view.highlightWin(highlightCoords);
      return true;
    }
    if (this.game[0][2] !== undefined && (this.game[0][2] === this.game[1][1]) && (this.game[1][1] === this.game[2][0])) {
      let highlightCoords = [];
      let diagLength = this.dimensions[0] < this.dimensions[1] ? this.dimensions[0] : this.dimensions[1];
      for (let i = 0; i < diagLength; i++) {
        highlightCoords.push([i, this.dimensions[1] - i]);
      }
      this.view.highlightWin(highlightCoords);
      return true;
    }

    return false;
  }
}
