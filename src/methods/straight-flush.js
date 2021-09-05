"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStraightFlush = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// Ace High straight would be
// 8 + 13 + 00 00 00 00 = 81300000000
// 8 high straight would be
// 8 + 07 + 00 00 00 00 = 80700000000
var checkStraightFlush = function (field) {
    var output = null;
    Object.keys(types_1.SUIT_INDEXES).some(function (suit) {
        var singleSuitColumn = (0, common_1.extractSingleSuitColumn)(field, suit);
        var straightValue = (0, common_1.getStraightValue)(singleSuitColumn);
        if (!straightValue) {
            return false;
        }
        var outputString = String(types_1.HAND_STRENGTHS[types_1.STRAIGHT_FLUSH]);
        outputString += (0, common_1.numberToTwoDigitString)(straightValue);
        outputString += "00000000";
        output = Number(outputString);
        return true;
    });
    return output;
};
exports.checkStraightFlush = checkStraightFlush;
