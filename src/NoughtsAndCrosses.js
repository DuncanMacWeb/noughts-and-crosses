export class NoughtsAndCrosses {
  constructor (players, view, dimensions = {x: 3, y: 3}) {

    this.view = view;

    this.gameFinished = false;
    this.playersTurn = 'X';

    this.game = new Array(3);
    for (var i = 0; i < 3; i++) {
      this.game[i] = ['', '', '']
    }

    var tdList = document.getElementById('nac')
      .querySelectorAll('td');

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        this.createOnClick(y, x);
      }
    }
  }

  highlightWin(el1, el2, el3) {
    console.log(this.playersTurn + ' has won');
    el1.style.background = 'red';
    el2.style.background = 'red';
    el3.style.background = 'red';
  }

  checkWon() {
    // horizontals
    for (var y = 0; y < 3; y++) {
      if (this.game[y][0] !== '' && (this.game[y][0] === this.game[y][1]) && (this.game[y][1] === this.game[y][2])) {
        highlightWin(
          tdList[y*3],
          tdList[y*3 + 1],
          tdList[y*3 + 2]);
        return true;
      }
    }

    // verticals
    for (var x = 0; x < 3; x++) {
      if (this.game[0][x] !== '' && (this.game[0][x] === this.game[1][x]) && (this.game[1][x] === this.game[2][x])) {
        highlightWin(
          tdList[x],
          tdList[1*3 + x],
          tdList[2*3 + x]);
        return true;
      }
    }

    // diagonals
    if (this.game[0][0] !== '' && (this.game[0][0] === this.game[1][1]) && (this.game[1][1] === this.game[2][2])) {
      highlightWin(
        tdList[0], tdList[4], tdList[8]);
      return true;
    }
    if (this.game[0][2] !== '' && (this.game[0][2] === this.game[1][1]) && (this.game[1][1] === this.game[2][0])) {
      highlightWin(
      tdList[2], tdList[4], tdList[6]);
      return true;
    }

    return false;
  }

  createOnClick(y, x) {
    tdList[y*3 + x].addEventListener('click', (event) => {
      //console.log('tdList[' + (y*3 + x).toString() + ']: y = ' + y.toString() + ', x = ' + x.toString());

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
    });
  }
}
