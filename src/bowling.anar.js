/**
 * Created by Azer on 01.12.2015.
 */
'use strict';
var Frame = require('./frame');
var FrameStates = require('./frame-states');


var MAX_NUMBER_OF_PINS = 10;

var BowlingGame = {

    init: function() {
        this.totalScore = 0;
        this.frames = [];

        var _frame = Object.create(Frame);
        _frame.init();

        this.frame = _frame;
        this.number = 1;
    },

    score: function() {
        return this.totalScore;
    },

    update: function(pins){
        this.frame.updateFirst(pins);
        this.frames.push(this.frame);
    },

    isFirstRoll: function () {
        return this.frames.length === 0;
    },

    getCurrentFrame: function () {
        if (this.isFirstRoll()) {
            return undefined;
        }

        return this.frames[this.frames.length-1];
    },

    getLastFrame: function () {
        //if (this.isFirstRoll()) {
        //    return undefined;
        //}

        return this.frames[this.frames.length-2];
    },

    roll: function(pins) {

        if (this.isFirstRoll()) {

            this.frame.updateFirst(pins);
            this.frames.push(this.frame);
            this.totalScore += this.number * pins;
        }
        else if (this.getCurrentFrame().isOver()) {

            // craete new frame
            this.frame = Object.create(Frame);
            this.frame.init();
            this.frame.updateFirst(pins);

            this.frames.push(this.frame);

            // if last frame is spare or strike then miltiply
            if (this.getLastFrame().isStrike() || this.getLastFrame().isSpare()) {
                this.totalScore += 2 * pins;
            }
            else {
                this.totalScore += pins;
            }
        }
        else {

            // update the second roll of the last frame
            this.frame.updateSecond(pins);
            this.frame.updateFrameNumber(this.frames.length);

            // if previous is strike then multiply
            console.log('####', this.getLastFrame());
            if (this.getLastFrame() && this.getLastFrame().isStrike()) {
                this.totalScore += 2 * pins;
            }
            else {
                this.totalScore += pins;
            }

        }

        //if(this.frame.first === undefined){
        //    // is it new frame - last frame is over
        //    if(pins === MAX_NUMBER_OF_PINS){
        //        // new frame and strike
        //
        //        if(this.frames.length > 0){
        //
        //            if(!this.getLastFrame().isStrike() && this.getLastFrame().isSpare()) {
        //                // if previous is spare but not strike, then calc
        //                this.number = 2;
        //            }
        //        }
        //        this.frame.updateSecond(0);
        //
        //        this.frame.updateFirst(pins);
        //        this.frame.updateFrameNumber(this.frames.length);
        //        this.frames.push(this.frame);
        //
        //        this.frame = Object.create(Frame);
        //        this.frame.init();
        //
        //        this.totalScore += this.number*pins;
        //        this.number = 2;
        //    }
        //    else{
        //        if(this.frames.length > 0){
        //            // first regular frame
        //
        //
        //            if(!this.getLastFrame().isStrike() && this.getLastFrame().isSpare()) {
        //                // if previos is spare but not strike, then calc
        //                this.number = 2;
        //                this.frame.updateFirst(pins);
        //                this.frames.push(this.frame);
        //                this.totalScore += this.number*pins;
        //                this.number = 1;
        //            }
        //            else {
        //
        //                this.frame.updateFirst(pins);
        //                this.frames.push(this.frame);
        //                this.totalScore += this.number*pins;
        //            }
        //        }
        //        else {
        //            // new and FIRST frame
        //
        //            this.frame.updateFirst(pins);
        //            this.frames.push(this.frame);
        //            this.totalScore += this.number * pins;
        //        }
        //    }
        //}
        //else{
        //    // already existing frame - last frame not over!
        //    this.frame.updateSecond(pins);
        //    this.frame.updateFrameNumber(this.frames.length);
        //    this.frame = Object.create(Frame);
        //    this.frame.init();
        //    this.totalScore += this.number * pins;
        //    this.number = 1;
        //}
    }
};

module.exports = BowlingGame;