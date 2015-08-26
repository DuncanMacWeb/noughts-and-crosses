/*
 * multidimensionalArray
 *   accepts dimensions: Array
 *      dimensions.length === number of dimensions
 *      each member of dimensions === length of array in the corresponding dimension
 *   for example:
 *      [3, 3] : a two-dimensional array of 3×3
 *      [4, 3, 2] : a three-dimensional array of 4×3×2
 *      [20, 20, 5, 37] : a four-dimensional array of 20×20×5×37
 */
export class nDimArray extends Array {
  constructor(...dimensions = [1]) {
    super()

    if (!(dimensions instanceof Array) || dimensions.length < 1) {
      throw new TypeError('multidimensionalArray takes an array of integers, each specifying the size of each dimension');
    }
    let _ndA = (dimensions) => !console.log(dimensions) && dimensions.length > 1 ?
      [...new Array( dimensions.shift() )]
        .map( (el, index, array) => index ?
          [...array[0]] :
          _ndA(dimensions) ) :
      new Array( dimensions[0] )

    return _ndA(dimensions)
  }
}
