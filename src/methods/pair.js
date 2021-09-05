"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPair = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// KKAJ8 would be
// 1 + 12 + 13 + 11 + 07 + 00 = 11213110700
var checkPair = function (field, excludeRankIndex) {
    if (excludeRankIndex === void 0) { excludeRankIndex = null; }
    var output = null;
    var endIndex = 13; // 13 cards + additional Ace = 14 total.
    for (var i = endIndex; i > 0; i--) {
        var count = (0, common_1.countCards)(field[i]);
        if (count === 2 && i !== excludeRankIndex) {
            var outputString = String(types_1.HAND_STRENGTHS[types_1.PAIR]);
            outputString += (0, common_1.numberToTwoDigitString)(i);
            var currentHighCardIndex = 1;
            var maxHighCardCount = 3;
            for (var j = endIndex; j >= 0; j--) {
                var hasHighCard = (0, common_1.countCards)(field[j]) === 1;
                if (hasHighCard) {
                    outputString += (0, common_1.numberToTwoDigitString)(j);
                    currentHighCardIndex++;
                    if (currentHighCardIndex > maxHighCardCount) {
                        outputString += "00";
                        output = Number(outputString);
                        break;
                    }
                }
            }
            break;
        }
    }
    return output;
};
exports.checkPair = checkPair;
