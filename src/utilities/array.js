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
export function multidimensionalArray(dimensions) {
  if (!(dimensions instanceof Array) || dimensions.length < 1) {
    throw new Error('multidimensionalArray takes an array of integers, each specifying the size of each dimension');
  }
  dimensions = dimensions.slice();
  return dimensions.length > 1 ?
    /* if still multi-dimensional, make a new array with the length of the first
     dimension, and fill every element of it with a multidimensional array made of
     the remaining dimensions */
    new Array( dimensions.shift() ).fill( multidimensionalArray(dimensions) ) :
    /* otherwise (just one dimension left), return an array of that length */
    new Array( dimensions[0] );
}
