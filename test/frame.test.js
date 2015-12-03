/**
 * Created by Azer on 01.12.2015.
 */
'use strict';

var chai = require('chai');
var assert = chai.assert;

var Frame = require('../src/frame');
var FrameStates = require('../src/frame-states');

describe ('Testing Frames class', function() {

    describe('for proper initialization', function() {

        var frame = Object.create(Frame);
        frame.init();

        it('should initialize with undefined properties', function() {
            var expect = undefined;
            var actual = frame.first;
            assert.equal(actual, expect);

            actual = frame.second;
            assert.equal(actual, expect);
        });

        it ('state should be REGULAR frame by default', function () {
            assert.equal(frame.frameState, FrameStates.REGULAR);
        })
    });

    describe ('isOver with strike frame', function () {

        var frame = Object.create(Frame);
        frame.init();
        frame.updateFirst(10);

        it ('should be over', function () {
            assert.isTrue(frame.isOver());
        });
    });

    describe ('isOver with spare frame', function () {

        var frame = Object.create(Frame);
        frame.init();
        frame.updateFirst(3);
        frame.updateSecond(7);

        it ('should be over', function () {
            assert.isTrue(frame.isOver());
        });
    });


    describe ('isOver with regular first and second rolls', function () {

        var frame = Object.create(Frame);
        frame.init();
        frame.updateFirst(3);
        frame.updateSecond(4);

        it ('should be over', function () {
            assert.isTrue(frame.isOver());
        });
    });

    describe ('isOver not over when the first roll made regular', function () {

        var frame = Object.create(Frame);
        frame.init();
        frame.updateFirst(3);

        it ('should be over', function () {
            assert.isFalse(frame.isOver());
        });
    });
});
