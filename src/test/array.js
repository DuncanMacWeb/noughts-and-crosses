import { multidimensionalArray } from '../utilities/array';

var assert = require("assert");

describe('multidimensionalArray', function() {
  describe('#ctr()', function () {
    it('ctr([3,3]) should return an obj with appropriate nested .length values', function () {
      var a = multidimensionalArray([3, 3]);
      assert.equal(a.length, 3);
      assert.equal(a[0].length, 3);
    });
    it('ctr([3,3]) should return an obj with 9 unique values', function () {
      var a = multidimensionalArray([3, 3]);
      a[0][0] = 'x';
      assert.equal(a[0][0], 'x');
      assert.equal(a[0][1], undefined);
      assert.equal(a[1][0], undefined);
    });

  });
});
