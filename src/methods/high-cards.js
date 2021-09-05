"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHighCards = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
var checkHighCards = function (field) {
    var compressed = (0, common_1.compressFieldToSingleColumn)(field);
    var indexes = (0, common_1.getRankingIndexes)(compressed);
    var maxHighCardCount = 5;
    var outputString = String(types_1.HAND_STRENGTHS[types_1.HIGH_CARD]);
    for (var i = 0; i < maxHighCardCount; i++) {
        var index = indexes[i];
        outputString += (0, common_1.numberToTwoDigitString)(index);
    }
    return Number(outputString);
};
exports.checkHighCards = checkHighCards;
