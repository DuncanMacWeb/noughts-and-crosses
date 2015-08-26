import { NoughtsAndCrosses } from '../NoughtsAndCrosses';
import { NACView } from '../NACViews';

var assert = require("assert");

describe('NoughtsAndCrosses 3x3', function () {
  var game;
  var _ = undefined;

  beforeEach(function () {
    game = new NoughtsAndCrosses([], new NACView(), [3, 3]);
    assert.equal(game.checkWon(), false);
  });

  describe('#checkWon()', function () {
    it('should detect winning diagonals', function () {
      game.board = [
        [0, _, _],
        [_, 0, _],
        [_, _, 0]];
      assert.equal(game.checkWon(), true);

      game.board = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]];
      assert.equal(game.checkWon(), true);
    });
    it('should detect winning verticals', function () {
      game.board = [
        [0, _, 1],
        [0, 1, 1],
        [_, 1, 0]];
      assert.equal(game.checkWon(), false);

      game.board = [
        [0, _, 1],
        [0, 1, 1],
        [0, 1, 0]];
      assert.equal(game.checkWon(), true);

      game.board = [
        [0, 0, 1],
        [0, _, 1],
        [1, 0, 0]];
      assert.equal(game.checkWon(), false);
    });
    it('should detect winning horizontals', function () {
      game.board = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 0]];
      assert.equal(game.checkWon(), true);

      game.board = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 1, 1]];
      assert.equal(game.checkWon(), true);
    });
  });
});


describe('NoughtsAndCrosses Coords', function () {

  describe('#getCoordinatesByLinearIndex()', function () {
    it('should transform linear coords to normal ones in 3', function () {
      var game = new NoughtsAndCrosses([], new NACView(), [3]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(2), [2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(0), [0]);
    });

    it('should transform linear coords to normal ones in 3x3', function () {
      var game = new NoughtsAndCrosses([], new NACView(), [3, 3]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(3*2 + 1), [1, 2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(0), [0, 0]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(3*1 + 2), [2, 1]);
    });

    it('should transform linear coords to normal ones in 3x3x3', function () {
      var game = new NoughtsAndCrosses([], new NACView(), [3, 3, 3]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(9*2 + 3*1 + 2), [2, 1, 2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(9*0 + 3*2 + 1), [1, 2, 0]);
    });
  });
});
