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
      game.game = [
        [0, _, _],
        [_, 0, _],
        [_, _, 0]];
      assert.equal(game.checkWon(), true);

      game.game = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]];
      assert.equal(game.checkWon(), true);
    });
    it('should detect winning verticals', function () {
      game.game = [
        [0, _, 1],
        [0, 1, 1],
        [_, 1, 0]];
      assert.equal(game.checkWon(), false);

      game.game = [
        [0, _, 1],
        [0, 1, 1],
        [0, 1, 0]];
      assert.equal(game.checkWon(), true);

      game.game = [
        [0, 0, 1],
        [0, _, 1],
        [1, 0, 0]];
      assert.equal(game.checkWon(), false);
    });
    it('should detect winning horizontals', function () {
      game.game = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 0]];
      assert.equal(game.checkWon(), true);

      game.game = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 1, 1]];
      assert.equal(game.checkWon(), true);
    });
  });
});
