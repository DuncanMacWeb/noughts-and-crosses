export class NACView {
  constructor() {

  }
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
}