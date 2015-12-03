'use strict';
var FrameStates = require('./frame-states.js');

var Frame = {
    init: function() {
        this.id = 0;
        this.first = undefined;
        this.second = undefined;
        this.bonuceShoot = undefined;
        this.frameScore = 0;
        this.frameState = FrameStates.REGULAR;
    },

    updateFrameNumber: function(number){
        this.id = number;
    },

    updateFirst: function (pins){
        if (pins === 10) {
            this.second = 0;
        }
        this.first = pins;
    },

    updateSecond: function (pins) {
        this.second = pins;
    },

    isStrike: function () {
        return this.first === 10;
    },

    isSpare: function () {
        return this.first + this.second === 10;
    },

    isOver: function () {

        return this.isStrike() || this.isSpare() || (this.first && this.second) ? true : false;
    }
};



module.exports = Frame;
