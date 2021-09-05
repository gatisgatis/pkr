"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFullHouse = void 0;
var types_1 = require("../types");
var three_of_kind_1 = require("./three-of-kind");
var pair_1 = require("./pair");
// KKK88 would be
// 6 + 12 + 07 + 00 00 00 = 61207000000
var checkFullHouse = function (field) {
    var threeCardValue = (0, three_of_kind_1.checkThreeOfKind)(field);
    if (!threeCardValue) {
        return null;
    }
    var threeCardValueAsString = String(threeCardValue);
    var threeCardRankIndex = threeCardValueAsString.slice(1, 3);
    var twoCardValue = (0, pair_1.checkPair)(field, Number(threeCardRankIndex));
    if (!twoCardValue) {
        return null;
    }
    var outputString = String(types_1.HAND_STRENGTHS[types_1.FULL_HOUSE]);
    outputString += threeCardRankIndex;
    var twoCardValueAsString = String(twoCardValue);
    var twoCardRankIndex = twoCardValueAsString.slice(1, 3);
    outputString += twoCardRankIndex;
    outputString += "000000";
    return Number(outputString);
};
exports.checkFullHouse = checkFullHouse;
