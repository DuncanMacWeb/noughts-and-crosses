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

    if (typeof this.form === 'undefined') {
      this.form = document.createElement('form');
      this.form.addEventListener('submit', (event)=> {
        this.game.restart();
        event.preventDefault();
      });
      this.element.appendChild(this.form);
    }

    let table = '';
    for (let y = 0; y < this.game.dimensions[1]; y++) {
      table += '<tr>';
      for (let x = 0; x < this.game.dimensions[0]; x++) {
        table += '<td></td>';
      }
      table += '</tr>';
    }
    this.form.innerHTML = `<table id="nac">${table}</table>`;

    let button = document.createElement('button');
    button.innerHTML = 'Restart';
    button.type = 'submit';
    this.form.appendChild(button);

    this.messages = document.createElement('div');
    this.messages.role = 'alert';
    this.messages.className = 'fadeout';
    this.form.appendChild(this.messages);

    this.tdList = document.getElementById('nac')
      .querySelectorAll('td');
    for (let y = 0; y < this.game.dimensions[1]; y++) {
      for (let x = 0; x < this.game.dimensions[0]; x++) {
        this.createInputCallback(x, y);
      }
    }
  }

  displayMessage(str, color) {
    this.messages.innerHTML = str;

    // To make the animation restart, we need to remove
    // the element from the DOM and then add it again
    // https://css-tricks.com/restart-css-animation/
    let messagesCopy = this.messages.cloneNode(true);
    this.messages.parentNode.replaceChild(messagesCopy, this.messages);
    this.messages = messagesCopy;

    this.messages.style.color = color;
  }

  log(str) {
    this.displayMessage(str, 'green');
  }

  error(str) {
    this.displayMessage(str, 'red');
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
