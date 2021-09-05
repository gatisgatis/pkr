"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTwoPair = void 0;
var types_1 = require("../types");
var pair_1 = require("./pair");
var common_1 = require("./common");
// KKTT8 would be
// 2 + 12 + 09 + 07 + 00 00 = 21209070000
var checkTwoPair = function (field) {
    var pairOneValue = (0, pair_1.checkPair)(field);
    if (!pairOneValue) {
        return null;
    }
    var pairOneRankIndex = String(pairOneValue).slice(1, 3);
    var pairTwoValue = (0, pair_1.checkPair)(field, Number(pairOneRankIndex));
    if (!pairTwoValue) {
        return null;
    }
    var outputString = String(types_1.HAND_STRENGTHS[types_1.TWO_PAIR]);
    outputString += pairOneRankIndex;
    var pairTwoRankIndex = String(pairTwoValue).slice(1, 3);
    outputString += pairTwoRankIndex;
    var endIndex = 13; // 13 cards + additional Ace = 14 total.
    for (var j = endIndex; j >= 0; j--) {
        var count = (0, common_1.countCards)(field[j]);
        var hasHighCard = count === 1;
        // Handle 3 pair situations.
        if (count === 2) {
            if (j !== Number(pairOneRankIndex) && j !== Number(pairTwoRankIndex)) {
                hasHighCard = true;
            }
        }
        if (hasHighCard) {
            outputString += (0, common_1.numberToTwoDigitString)(j);
            outputString += "0000";
            break;
        }
    }
    return Number(outputString);
};
exports.checkTwoPair = checkTwoPair;
