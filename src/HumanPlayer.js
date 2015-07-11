import {Player} from './Player';

export class HumanPlayer extends Player {
  constructor () {
    super();
  }

  move(view) {
    return new Promise((resolve, reject) => {
      view.setClickCallback((coords) => {
        resolve(coords);
      });
    });
  }

}