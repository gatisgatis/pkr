"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkThreeOfKind = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// KKKJ8 would be
// 3 + 12 + 11 + 07 00 00 = 31211070000
// 999A4
// 3 + 08 + 13 + 03 + 00 00 = 30813030000
var checkThreeOfKind = function (field) {
    var output = null;
    var endIndex = 13; // 13 cards + additional Ace = 14 total.
    for (var i = endIndex; i >= 0; i--) {
        var count = (0, common_1.countCards)(field[i]);
        if (count === 3) {
            var outputString = String(types_1.HAND_STRENGTHS[types_1.THREE_OF_KIND]);
            outputString += (0, common_1.numberToTwoDigitString)(i);
            var currentHighCardIndex = 1;
            var maxHighCardCount = 2;
            for (var j = endIndex; j >= 0; j--) {
                var hasHighCard = (0, common_1.countCards)(field[j]) === 1;
                if (hasHighCard) {
                    outputString += (0, common_1.numberToTwoDigitString)(j);
                    currentHighCardIndex++;
                    if (currentHighCardIndex > maxHighCardCount) {
                        outputString += "0000";
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
exports.checkThreeOfKind = checkThreeOfKind;
