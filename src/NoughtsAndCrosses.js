import {runGame} from './game';

export class NoughtsAndCrosses {
  constructor (dimensions, players, element_or_selector) {
    if (typeof element_or_selector === 'string') {
       element_or_selector = document.querySelector(element_or_selector);
    }

    if (element_or_selector !== undefined) {
      var table = '';
      for (var y = 0; y < dimensions.y; y++) {
        table += '<tr>';
        for (var x = 0; x < dimensions.x; x++) {
          table += '<td></td>';
        }
        table += '</tr>';
      }

      element_or_selector.innerHTML = `
        <h1>Noughts and crosses</h1>
        <table id="nac">${table}</table>`;
    }

    runGame();
  }
}