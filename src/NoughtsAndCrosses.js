import { multidimensionalArray } from './utilities/array'

export class NoughtsAndCrosses {
  /*  NoughtsAndCrosses(players, view, [dimensions, k])
   *    players     : array of Player objects
   *    view        : a NACView object (or subclass such as NACDOMView)
   *    dimensions  : an array of dimensions
   *    k           : the length of the winning line (see m,n,k-game on Wikipedia)
   */
  constructor (players, view, dimensions = [3, 3], k = undefined) {

    if (dimensions.length > 2) {
      throw new Error('NoughtsAndCrosses doesn’t support more than two dimensions, sorry!');
    }

    this.view = view;

    this.gameFinished = false;
    this.players = players;

    this.dimensions = dimensions;
    this.game = multidimensionalArray(dimensions);

    this.k = k ? k : dimensions[0];

    this.view.initialize(dimensions);

    this.currentPlayer = this.players[0];
    currentPlayer.move().then(this.doPlayerMove);
  }

  getPlayerSymbol(i) {
    const symbols = ['X', 'O', 'Z'],
      len = symbols.length;
    return i < len ? symbols[i] : (i - len).toString();
  }

  doPlayerMove(coords) {
    let playerSymbol = this.getPlayerSymbol(this.players.indexOf(this.currentPlayer));
    let x = coords[0], y = coords[1];
    this.game[y][x] = playerSymbol;
    this.view.showMove(coords, playerSymbol);

    if (this.checkWon()) {
      this.gameFinished = true;
      return;
    }

    let nextPlayerIndex = (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
    this.currentPlayer.move().then(this.doPlayerMove);
  }

  findDirections(nDimensions = this.dimensions.length) {
    /*  for every dimension,
          for every other dimension,
            look in every direction:
              [-1, 0, +1]             */

    /* These are the 'directions' for up to 3 dimensions:
        Key: ! all-zero (all-zeros means no movement)
             > duplicate
      [-1]  [-1, -1],  [-1, -1, -1],
                       [-1, -1,  0],
                       [-1, -1,  1]
            [-1,  0],  [-1,  0, -1],
                       [-1,  0,  0],
                       [-1,  0,  1]
            [-1,  1]   [-1,  1, -1],
                       [-1,  1,  0],
                       [-1,  1,  1]
     ![ 0]  [0,  -1],  [ 0, -1, -1],
                       [ 0, -1,  0],
                       [ 0, -1,  1]
           ![0,   0],  [ 0,  0, -1],
                      ![ 0,  0,  0]
                      >[ 0,  0,  1]
           >[0,   1]  >[ 0,  1, -1],
                      >[ 0,  1,  0],
                      >[ 0,  1,  1]
     >[ 1] >[1,  -1], >[ 1, -1, -1],
                      >[ 1, -1,  0],
                      >[ 1, -1,  1]
           >[1,   0], >[ 1,  0, -1],
                      >[ 1,  0,  0],
                      >[ 1,  0,  1]
           >[1,   1]  >[ 1,  1, -1],
                      >[ 1,  1,  0],
                      >[ 1,  1,  1]
       we can see that:
        If we always return [..., -1|0|1] plus the result of calling ourselves
         with a flag indicating whether we are all zero so far or not,
         *except* IF WE ARE ALL ZERO where we return only the result of calling
         ourselves with [..., -1] AND EXIT THE LOOP on the final dimension,
        then we ought to reproduce the table above.
        -------
        1. Make array starting at -1: recurse, adding [-1|0|1]
        2. Append array starting at 0: recurse, adding [-1|0|1]
            until all-zeros is reached at the final dimension
        
      The following code has ways reversed ([1, 0, -1]) so we’ll be most efficient
      searching from the top left rather than bottom right in a 2D game.      */

    let results = [], ways = [1, 0, -1], // forwards, stay still, backwards
      allzerosreached = 'NoughtsAndCrosses.directions: all-zeros reached',
      /* ds: dimensions left to deal with
         nz: all non-zero so far? (Boolean)
         c: current result so far */
      d = (ds, nz, c) => ways.forEach(
        w => ds ? // for every way w, if we haven’t reached the final dimension yet,
          d(ds - 1, nz || w, [...c, w]) : // call ourselves maintining nz; otherwise,
          nz || w ?                               // if we're non-zero,
            results.push([...c, w]) :             // add this result
            ( () => { throw allzerosreached } )() // otherwise (zeros!!!) STOP
      );
    if (nDimensions < 2) return [[1]]; // bail early if this is a 1-D game!!
    try {
      // next line must be [1, 0] not vice versa, ∵ d() will throw during the 0 recursion
      [1, 0].forEach( w => d(  // for each way w in [1, 0] (∵ [-1, ...] is duplicates)
          // one dimension’s catered for with [1, 0]; subtract one more to end on 0
          nDimensions - 2,
          !!w, // to make a Boolean indicating if we’re all non-zero so far
          [w]  // copy w into the `c` array argument to be the current working copy
        )
      );
    } catch (e) {
      if (e !== allzerosreached) throw e
    }
    return results
  }

  checkWon() {
    /* this.dimensions = [...]
       this.game = [...]
       output: this.view.highlightWin(highlightCoords = [[coord], [coord]])
     */

    return false;
  }
}
