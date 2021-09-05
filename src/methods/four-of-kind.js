"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFourOfKind = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
// KKKK8
// 7 + 12 + 07 + 00 00 00 = 71207000000
// JJJJA
// 7 + 11 + 13 +  00 00 00 = 71113000000
var checkFourOfKind = function (field) {
    var output = null;
    var endIndex = 13; // 13 cards + additional Ace = 14 total.
    for (var i = endIndex; i >= 0; i--) {
        var count = (0, common_1.countCards)(field[i]);
        if (count === 4) {
            for (var j = endIndex; j >= 0; j--) {
                var hasHighCard = (0, common_1.countCards)(field[j]) === 1;
                if (hasHighCard) {
                    var outputString = String(types_1.HAND_STRENGTHS[types_1.FOUR_OF_KIND]);
                    outputString += (0, common_1.numberToTwoDigitString)(i);
                    outputString += (0, common_1.numberToTwoDigitString)(j);
                    outputString += "000000";
                    output = Number(outputString);
                    break;
                }
            }
            break;
        }
    }
    return output;
};
exports.checkFourOfKind = checkFourOfKind;
