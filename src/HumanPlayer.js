import {Player} from './Player';

export class HumanPlayer extends Player {
  constructor () {
    super();
  }

  move = (view) => new Promise(
    (resolve, reject) => view.setInputCallback(
      (coords) => resolve(coords)
    )
  );
}
