export class NACView {
  constructor() {

  }
  initialize(dimensions)
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

    var table = '';
    for (var y = 0; y < dimensions.y; y++) {
      table += '<tr>';
      for (var x = 0; x < dimensions.x; x++) {
        table += '<td></td>';
      }
      table += '</tr>';
    }

    this.element.innerHTML = `<table id="nac">${table}</table>`;
  }

  setClickCallback(clickCallback) {
    this.clickCallback = clickCallback;
  }

  initialize(dimensions) {
    if dimensions.length > 2 {
      throw new Error('NACDOMView doesn’t support more than two dimensions, sorry!');
    }
    this.dimensions = dimensions;

    this.tdList = document.getElementById('nac')
      .querySelectorAll('td');

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        this.createOnClick(x, y);
      }
    }
  }

  createOnClick(x, y) {
    tdList[y*3 + x].addEventListener('click', (event) => {
      //console.log('tdList[' + (y*3 + x).toString() + ']: y = ' + y.toString() + ', x = ' + x.toString());

      this.clickCallback(x, y);
    });
  }

  highlightWin(el1, el2, el3) {
    console.log(this.playersTurn + ' has won');
    el1.style.background = 'red';
    el2.style.background = 'red';
    el3.style.background = 'red';
  }
}