import NoughtsAndCrosses from './NoughtsAndCrosses';
import Player from './Player';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector) {
    let script = document.querySelector('script[data-nac-id]');
    if (!script) {
      return;
    }
    let targetElName = script.getAttribute('data-nac-id'),
      targetEl = document.getElementById( targetElName );
    if (!targetEl) {
      raise new Error('Can’t find element ' + targetElName);
    }
  }

  // find/set up options object

  // Set up game
});