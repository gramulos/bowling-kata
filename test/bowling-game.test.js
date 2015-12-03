/**
 * Created by Azer on 01.12.2015.
 */

'use strict';

var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var assert = chai.assert;

var BowlingGame = require('../src/bowling-game');

describe('Testing bowling game', function() {

   describe('with one shoot knocking down less than 10 pins', function(){

       var game = Object.create(BowlingGame);
       before(function () {
           game.init();
           game.roll(5);
       });

      it('should return total points equal to number of knocked pins', function() {
          var expected = 5;
          var actual = game.totalScore;

          assert.equal(actual,expected);
      });
   });

    describe ('with two shoots made', function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(5);
        game.roll(3);

        it('should return total points equal to number of knocked pins', function() {
            var expected = 8;
            var actual = game.totalScore;

            assert.equal(actual,expected);
        });

        it('should return one as the number of frames',function(){
            var expected = 1;
            var actual = game.frames.length;
            assert.equal(actual,expected);
        });

        it('should return the moves made',function(){
            var expected = {first:5,second:3};
            var actual = game.frames[0];

            assert.shallowDeepEqual(actual, expected);
        });
    });

    describe('when three shoots made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(5);
        game.roll(3);
        game.roll(4);
        game.roll(4);

        it('should return the 2 frames created',function(){
            var expected = 2;
            var actual = game.frames.length;
            assert.equal(actual,expected);

        })
    });

    describe ('when strike made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(10);
        game.roll(3);

        it('should return 0 in the second roll',function(){
            var expected = 0;
            var actual = game.frames[0].second;
            assert.equal(actual,expected);

        });

        it('should return frame count',function(){
            var expected = 2;
            var actual = game.frames.length;
            assert.equal(actual,expected);
        });

        it('should return 16 as the total score',function(){
            var expected = 16;
            var actual = game.totalScore;
            assert.equal(actual,expected);
        });
    });

    describe('when two consecutive strikes made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(10);
        game.roll(10);

        it('should return 0 in the second roll',function(){
            var expected = 0;
            var actual = game.frames[0].second;
            assert.equal(actual,expected);

        });
    });

    describe ('when one strike and two shoots made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(10);
        game.roll(3);
        game.roll(4);
        game.roll(2);

        it('should return calculated total score (Exapmle: 10,3,4,2 = 26)',function(){
            var expected = 26;
            var actual = game.totalScore;
            assert.equal(actual,expected);

        });
    });

    describe('when one spare made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(7);
        game.roll(3);
        game.roll(2);
        game.roll(3);

        it('should return calculated total score (Exapmle: 7,3,2,3 = 17)',function(){
            var expected = 17;
            var actual = game.totalScore;
            assert.equal(actual,expected);

        });
    });

    describe('when more than one spare made',function(){

        var game = Object.create(BowlingGame);
        game.init();
        game.roll(7);
        game.roll(3);
        game.roll(2);
        game.roll(8);
        game.roll(2);

        it('should return calculated total score (Exapmle: 7,3,2,8,2 = 26)',function(){
            var expected = 26;
            var actual = game.totalScore;
            assert.equal(actual,expected);

        });
    });

    describe('when testing full game',function(){

        var game = Object.create(BowlingGame);
        game.init();

        game.roll(7);
        game.roll(3); //10

        game.roll(2); //14
        game.roll(8); //22

        game.roll(10); //42

        game.roll(1); //44
        game.roll(0); //44

        game.roll(10); //54

        game.roll(0); //54
        game.roll(10); //74

        game.roll(7); //88
        game.roll(3); //91

        game.roll(2); //95
        game.roll(3); //98

        game.roll(10); //108

        game.roll(1); //110
        game.roll(8); //126

        it('should return calculated total score (Exapmle: [7,3],[2,8],[10],[1,0],[0,10],[7,3],[2,3],[10],[1,8] = 126)',function(){
            var expected = 126;
            var actual = game.totalScore;
            assert.equal(actual,expected);

        });
    });

    //describe('console the statuses',function(){
    //
    //    var game = Object.create(BowlingGame);
    //    game.init();
    //
    //    game.roll(7);
    //
    //
    //    it('should return the status each time a ball is rolled',function(){
    //        var expected = 7 ;
    //        var actual = game.totalScore;
    //        assert.equal(actual,expected);
    //
    //    });
    //});
});