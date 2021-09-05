"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStraight = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// Ace high straight would be
// 4 + 13 + 00 00 00 00 = 41300000000
var checkStraight = function (field) {
    var output = null;
    var compressed = (0, common_1.compressFieldToSingleColumn)(field);
    var straightRank = (0, common_1.getStraightValue)(compressed);
    if (!!straightRank) {
        var outputString = String(types_1.HAND_STRENGTHS[types_1.STRAIGHT]);
        outputString += (0, common_1.numberToTwoDigitString)(straightRank);
        outputString += "00000000";
        output = Number(outputString);
    }
    return output;
};
exports.checkStraight = checkStraight;
