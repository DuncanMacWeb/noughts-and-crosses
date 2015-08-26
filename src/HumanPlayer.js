import {Player} from './Player';

export class HumanPlayer extends Player {
  constructor () {
    super();
  }

  move = (game, view) => new Promise(
    (resolve, reject) => view.setInputCallback(
      (coords) => resolve(coords)
    )
  );
}
