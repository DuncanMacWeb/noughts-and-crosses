document.addEventListener('DOMContentLoaded', () => {

  var gameFinished = false;
  var playersTurn = 'X';
  var game = new Array(3);
  for (var i = 0; i < 3; i++) {
    game[i] = ['', '', '']
  }

  var tdList = document.getElementById('nac')
    .querySelectorAll('td');

  function highlightWin(el1, el2, el3) {
    console.log(playersTurn + ' has won');
    el1.style.background = 'red';
    el2.style.background = 'red';
    el3.style.background = 'red';
  }

  function checkWon() {
    // horizontals
    for (var y = 0; y < 3; y++) {
      if (game[y][0] !== '' && (game[y][0] === game[y][1]) && (game[y][1] === game[y][2])) {
        highlightWin(
          tdList[y*3],
          tdList[y*3 + 1],
          tdList[y*3 + 2]);
        return true;
      }
    }

    // verticals
    for (var x = 0; x < 3; x++) {
      if (game[0][x] !== '' && (game[0][x] === game[1][x]) && (game[1][x] === game[2][x])) {
        highlightWin(
          tdList[x],
          tdList[1*3 + x],
          tdList[2*3 + x]);
        return true;
      }
    }

    // diagonals
    if (game[0][0] !== '' && (game[0][0] === game[1][1]) && (game[1][1] === game[2][2])) {
      highlightWin(
        tdList[0], tdList[4], tdList[8]);
      return true;
    }
    if (game[0][2] !== '' && (game[0][2] === game[1][1]) && (game[1][1] === game[2][0])) {
      highlightWin(
      tdList[2], tdList[4], tdList[6]);
      return true;
    }

    return false;
  }

  function createOnClick(y, x) {
    tdList[y*3 + x].addEventListener('click', (event) => {
      //console.log('tdList[' + (y*3 + x).toString() + ']: y = ' + y.toString() + ', x = ' + x.toString());

      if (!gameFinished && game[y][x] === '') {
        game[y][x] = playersTurn;
        event.target.innerHTML = playersTurn;

        if (checkWon()) {
          gameFinished = true;
        }

        if (playersTurn === 'X') {
          playersTurn = 'O';
        } else {
          playersTurn = 'X';
        }
      }
    });
  }

  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      createOnClick(y, x);
    }
  }
});