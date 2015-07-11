import {NoughtsAndCrosses} from './NoughtsAndCrosses';
import {NACDOMView} from './NACViews';
import {HumanPlayer} from './HumanPlayer';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector) {
    let script = document.querySelector('script[data-nac-target]');
    if (!script) {
      return;
    }
    let targetElName = script.getAttribute('data-nac-id'),
      targetEl = document.getElementById( targetElName );
    if (!targetEl) {
      throw new Error('Can’t find element ' + targetElName);
    }

    // TODO: find/set up options object

    // Set up game with dimensions, players and view
    let game = new NoughtsAndCrosses(
      {x: 3, y: 3},
      [new HumanPlayer(), new HumanPlayer()],
      new NACDOMView() );
  }
});