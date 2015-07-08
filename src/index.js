import {NoughtsAndCrosses} from './NoughtsAndCrosses';
import {HumanPlayer} from './HumanPlayer';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector) {
    let script = document.querySelector('script[data-nac-id]');
    if (!script) {
      return;
    }
    let targetElName = script.getAttribute('data-nac-id'),
      targetEl = document.getElementById( targetElName );
    if (!targetEl) {
      throw new Error('Can’t find element ' + targetElName);
    }

    // TODO: find/set up options object

    // Set up game
    let players = [new HumanPlayer(), new HumanPlayer()];
    let game = new NoughtsAndCrosses({x:3,y:3}, players, targetEl);
  }
});