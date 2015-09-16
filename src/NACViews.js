export class NACView {
  constructor() { }

  initialize(game) {
    this.game = game;
  }

  showMove(coords, playerSymbol) {}
  setInputCallback(inputCallback) {}
  highlightWin(coordsList) {}
}

export class NACDOMView extends NACView {
  constructor(element, options = {}) {
    super();
    if (typeof element === 'string') {
       this.element = document.querySelector(element) || document.getElementById(element)
    } else {
      this.element = element;
    }
    /* IE8 doesn’t implement addEventListener, but we should polyfill it before this check */
    if (!this.element.addEventListener) {
      throw new TypeError('NACDOMView requires an element, selector or ID')
    }

    this.options = options;
    this.options.winHighlightColour = this.options.winHighlightColour || 'red';
  }

  initialize(game) {
    super.initialize(...arguments);

    if (this.game.dimensions.length > 2) {
      throw new Error('NACDOMView doesn’t support more than two dimensions, sorry!');
    }

    let form = document.createElement('form');

    let table = '';
    for (let y = 0; y < this.game.dimensions[1]; y++) {
      table += '<tr>';
      for (let x = 0; x < this.game.dimensions[0]; x++) {
        table += '<td></td>';
      }
      table += '</tr>';
    }
    form.innerHTML = `<table id="nac">${table}</table>`;

    let button = document.createElement('button');
    button.innerHTML = 'Restart';
    button.type = 'submit';

    form.addEventListener('submit', ()=> {
      this.game.restart();
    });

    form.appendChild(button);

    this.element.appendChild(form);


    this.tdList = document.getElementById('nac')
      .querySelectorAll('td');

    for (let y = 0; y < this.game.dimensions[1]; y++) {
      for (let x = 0; x < this.game.dimensions[0]; x++) {
        this.createInputCallback(x, y);
      }
    }
  }

  showMove(coords, playerSymbol) {
    let x = coords[0];
    let y = coords[1];
    this.tdList[y*this.game.dimensions[1] + x].innerHTML = playerSymbol;
  }

  setInputCallback(inputCallback) {
    this.inputCallback = inputCallback;
  }

  createInputCallback(x, y) {
    this.tdList[y*this.game.dimensions[1] + x].addEventListener('click', (event) => {
      //console.log('tdList[' + (y*3 + x).toString() + ']: y = ' + y.toString() + ', x = ' + x.toString());

      if (this.inputCallback) {
        this.inputCallback([x, y]);
        this.inputCallback = undefined;
      };
    });
  }

  highlightWin(coordsList) {
    for (let coords of coordsList) {
      let x = coords[0];
      let y = coords[1];
      let el = this.tdList[y*this.game.dimensions[1] + x];
      el.style.background = this.options.winHighlightColour;
    }
  }
}
