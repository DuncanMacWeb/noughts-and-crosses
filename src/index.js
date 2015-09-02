import {NoughtsAndCrosses} from './NoughtsAndCrosses';
import {NACDOMView} from './NACViews';
import {HumanPlayer} from './HumanPlayer';
import {ComputerPlayer} from './ComputerPlayer';

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

    // Set up game with players, view and dimensions
    let game = new NoughtsAndCrosses(
      [new ComputerPlayer(), new HumanPlayer()],
      new NACDOMView(targetEl) );
    game.start();
  }
});