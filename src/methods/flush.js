"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFlush = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// AJ542 flush would be
// 5 + 13 + 10 + 04 + 03 + 01 = 51310040301
var checkFlush = function (field) {
    var output = null;
    Object.keys(types_1.SUIT_INDEXES).some(function (suit) {
        var singleSuitColumn = (0, common_1.extractSingleSuitColumn)(field, suit);
        // do not count double Ace
        var isFlush = (0, common_1.countCards)(singleSuitColumn.slice(0, singleSuitColumn.length - 1)) >= 5;
        if (!isFlush) {
            // go to next iteration / check next suit
            return false;
        }
        var outputString = String(types_1.HAND_STRENGTHS[types_1.FLUSH]);
        var indexes = (0, common_1.getRankingIndexes)(singleSuitColumn);
        var maxRankCardCount = 5;
        for (var i = 0; i < maxRankCardCount; i++) {
            var index = indexes[i];
            outputString += (0, common_1.numberToTwoDigitString)(index);
        }
        output = Number(outputString);
        // break 'some' loop
        return true;
    });
    return output;
};
exports.checkFlush = checkFlush;
