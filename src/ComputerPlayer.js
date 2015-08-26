import Player from './Player'

export default class ComputerPlayer extends Player {
  constructor() {
    super();
  }

  getCoordinates(linearPos) {

  }

  move = (game, view) => {
    let totalNumCells = view.dimensions.reduce((acc, val) => acc * val);

    let startCell = Math.floor(Math.random() * totalNumCells);

    for (let i = 0; i < totalNumCells; i++) {
      let cell = (startCell + i) % totalNumCells;


      if (game.getCellByLinearIndex()) {

      }
    }
    // check if cell is full, if so keep moving on


    for (d of view.dimensions.length) {

    }

    return new Promise(
      (resolve, reject) => resolve(coords)
    );
  }

}
