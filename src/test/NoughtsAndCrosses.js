import { NoughtsAndCrosses } from '../NoughtsAndCrosses';
import { NACView } from '../NACViews';
import { ComputerPlayer } from '../ComputerPlayer'

var assert = require("assert");

describe('NoughtsAndCrosses 3x3', function () {
  var game;
  var _ = undefined;

  beforeEach(function () {
    game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3, 3]});
    assert.equal(game.checkWinStatus(), 'continue');
  });

  describe('#checkWinStatus()', function () {
    it('should detect winning diagonals', function () {
      game.board = [
        [0, _, _],
        [_, 0, _],
        [_, _, 0]];
      assert.equal(game.checkWinStatus(), 'win');

      game.board = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]];
      assert.equal(game.checkWinStatus(), 'win');
    });
    it('should detect winning verticals', function () {
      game.board = [
        [0, _, 1],
        [0, 1, 1],
        [_, 1, 0]];
      assert.equal(game.checkWinStatus(), 'continue');

      game.board = [
        [0, _, 1],
        [0, 1, 1],
        [0, 1, 0]];
      assert.equal(game.checkWinStatus(), 'win');

      game.board = [
        [0, 0, 1],
        [0, _, 1],
        [1, 0, 0]];
      assert.equal(game.checkWinStatus(), 'continue');
    });
    it('should detect winning horizontals', function () {
      game.board = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 0]];
      assert.equal(game.checkWinStatus(), 'win');

      game.board = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 1, 1]];
      assert.equal(game.checkWinStatus(), 'win');
    });
  });
});


describe('NoughtsAndCrosses Coords', function () {

  describe('#getCoordinatesByLinearIndex()', function () {
    it('should transform linear coords to normal ones in 3', function () {
      var game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3]});

      assert.deepEqual(game.getCoordinatesByLinearIndex(2), [2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(0), [0]);
    });

    it('should transform linear coords to normal ones in 3x3', function () {
      var game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3, 3]});

      assert.deepEqual(game.getCoordinatesByLinearIndex(3*2 + 1), [1, 2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(0), [0, 0]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(3*1 + 2), [2, 1]);
    });

    it('should transform linear coords to normal ones in 3x3x3', function () {
      var game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3, 3, 3]});

      assert.deepEqual(game.getCoordinatesByLinearIndex(9*2 + 3*1 + 2), [2, 1, 2]);

      assert.deepEqual(game.getCoordinatesByLinearIndex(9*0 + 3*2 + 1), [1, 2, 0]);
    });
  });

  describe('#getCellByCoords', () => {
    it('should return “X” for [2, 0, 1] and [1, 2, 2, 4]', () => {
      let game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3, 3, 3]})
      game.board[2][0][1] = 'X'
      assert.equal(game.getCellByCoords([2, 0, 1]), 'X')

      game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [2, 3, 4, 5]})
      game.board[1][2][2][4] = 'X'
      assert.equal(game.getCellByCoords([1, 2, 2, 4]), 'X')
    });
    it('should raise an error when incorrect numbers of dimensions are passed', () => {
      let game = new NoughtsAndCrosses({players: [], view: new NACView(), dimensions: [3, 3, 3]})
      game.board[2][0][1] = 'X'
      assert.throws(() => game.getCellByCoords([2, 0, 1, 2]), /not the same length/)
    })
  });
});

describe('#sessions', () => {
  it('should keep track of sessions', async function (done) {
    try {
      let game = new NoughtsAndCrosses({
        players: [new ComputerPlayer(), new ComputerPlayer()],
        view: new NACView()
      });
      console.log('running game the first time')
      await game.run();

      console.log('testing game after first run')
      assert.equal(game.gameFinished, true);
      assert.equal(
        game.results.numWins.reduce((acc, val) => acc + val)
          + game.results.numDraws,
        1,
        `After the first game there should be 1 win or 1 draw`
      );

      game.initialize({/*autostart: true*/});
      console.log('running game the second time')
      await game.run();

      console.log('testing game after second run')
      assert.equal(game.gameFinished, true);
      assert.equal(
        game.results.numWins.reduce((acc, val) => acc + val)
          + game.results.numDraws,
        2,
          `After the second game the sum total of wins and draws should be 2`
      );

      done();
    } catch (e) {
      console.error(e.stack);
      throw e;
    }
  });
});