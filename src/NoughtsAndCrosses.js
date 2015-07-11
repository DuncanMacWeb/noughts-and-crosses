export class NoughtsAndCrosses {
  constructor (players, view, dimensions = [3, 3]) {

    if (dimensions.length > 2) {
      throw new Error('NoughtsAndCrosses doesn’t support more than two dimensions, sorry!');
    }

    this.view = view;

    this.gameFinished = false;
    this.players = players;

    this.game = new Array(3);
    for (var i = 0; i < 3; i++) {
      this.game[i] = ['', '', '']
    }

    this.view.initPlayCallback(this.onPlay);

    this.view.initialize(dimensions);

    this.currentPlayer = this.players[0];
    currentPlayer.move().then(this.doPlayerMove);
  }

  static getPlayerSymbol(i) {
    return ['X', 'O', 'Z'][i];
  }

  doPlayerMove(coords) {
    let playerSymbol = this.getPlayerSymbol(this.playersTurn);
    this.game[y][x] = playerSymbol;
    this.view.showMove(coords, playerSymbol);

    if (this.checkWon()) {
      this.gameFinished = true;
      return;
    }

    this.currentPlayer = (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
    this.currentPlayer.move().then(this.doPlayerMove);
  }

  onPlay(x, y) {
    if (!this.gameFinished && this.game[y][x] === '') {
      this.game[y][x] = this.playersTurn;
      event.target.innerHTML = this.playersTurn;

      if (this.checkWon()) {
        this.gameFinished = true;
      }

      if (this.playersTurn === 'X') {
        this.playersTurn = 'O';
      } else {
        this.playersTurn = 'X';
      }
    }
  }

  checkWon() {
    // horizontals
    for (var y = 0; y < 3; y++) {
      if (this.game[y][0] !== '' && (this.game[y][0] === this.game[y][1]) && (this.game[y][1] === this.game[y][2])) {
        this.view.highlightWin(
          tdList[y*3],
          tdList[y*3 + 1],
          tdList[y*3 + 2]);
        return true;
      }
    }

    // verticals
    for (var x = 0; x < 3; x++) {
      if (this.game[0][x] !== '' && (this.game[0][x] === this.game[1][x]) && (this.game[1][x] === this.game[2][x])) {
        this.view.highlightWin(
          tdList[x],
          tdList[1*3 + x],
          tdList[2*3 + x]);
        return true;
      }
    }

    // diagonals
    if (this.game[0][0] !== '' && (this.game[0][0] === this.game[1][1]) && (this.game[1][1] === this.game[2][2])) {
      this.view.highlightWin(
        tdList[0], tdList[4], tdList[8]);
      return true;
    }
    if (this.game[0][2] !== '' && (this.game[0][2] === this.game[1][1]) && (this.game[1][1] === this.game[2][0])) {
      this.view.highlightWin(
        tdList[2], tdList[4], tdList[6]);
      return true;
    }

    return false;
  }
}
