class NoughtsAndCrosses {
  constructor (dimensions, players, element_or_selector) {
    if (typeof element_or_selector === 'string') {
       element_or_selector = document.querySelector(element_or_selector);
    }

    element_or_selector.innerHTML = '';
  }
}