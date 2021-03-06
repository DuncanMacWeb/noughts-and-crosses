import {Player} from './Player'

export class ComputerPlayer extends Player {
  constructor() {
    super();
  }

  move = (game, view) => {
    let totalNumCells = game.dimensions.reduce((acc, val) => acc * val);

    let startCell = Math.floor(Math.random() * totalNumCells);

    for (let i = 0; i < totalNumCells; i++) {
      let cell = (startCell + i) % totalNumCells;

      if (game.getCellByLinearIndex(cell) === undefined) {
          return new Promise(
            (resolve, reject) => resolve(game.getCoordinatesByLinearIndex(cell))
          );
      }
    }

    throw new Error('All cells are occupied - nowhere for computer player to play')
  }

}
