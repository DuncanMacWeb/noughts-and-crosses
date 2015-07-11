export class NACView {
  constructor() { }
  initialize(dimensions) { } // dimensions is an array

}

export class NACDOMView extends NACView {
  constructor(element) {
    super();
    if (typeof element === 'string') {
       this.element = document.querySelector(element) || document.getElementById(element)
    }
    if (!('appendChild' in this.element)) {
      throw new Error('NACDOMView requires an element, selector or ID')
    }
  }

  initialize(dimensions) {
    if (dimensions.length > 2) {
      throw new Error('NACDOMView doesn’t support more than two dimensions, sorry!');
    }
    this.dimensions = dimensions;

    let table = '';
    for (let y = 0; y < dimensions[1]; y++) {
      table += '<tr>';
      for (let x = 0; x < dimensions[0]; x++) {
        table += '<td></td>';
      }
      table += '</tr>';
    }
    this.element.innerHTML = `<table id="nac">${table}</table>`;

    this.tdList = document.getElementById('nac')
      .querySelectorAll('td');

    for (let y = 0; y < dimensions[1]; y++) {
      for (let x = 0; x < dimensions[0]; x++) {
        this.createOnClick(x, y);
      }
    }
  }

  showMove(coords, playerSymbol) {
    let x = coords[0];
    let y = coords[1];
    this.tdList[y*this.dimensions[1] + x].innerHTML = playerSymbol;
  }

  setClickCallback(clickCallback) {
    this.clickCallback = clickCallback;
  }

  createOnClick(x, y) {
    this.tdList[y*this.dimensions[1] + x].addEventListener('click', (event) => {
      //console.log('tdList[' + (y*3 + x).toString() + ']: y = ' + y.toString() + ', x = ' + x.toString());

      this.clickCallback([x, y]);
    });
  }

  highlightWin(el1, el2, el3) {
    console.log(this.playersTurn + ' has won');
    el1.style.background = 'red';
    el2.style.background = 'red';
    el3.style.background = 'red';
  }
}