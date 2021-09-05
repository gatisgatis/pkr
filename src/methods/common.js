"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinalHandValue = exports.getRankingIndexes = exports.compressFieldToSingleColumn = exports.extractSingleSuitColumn = exports.getStraightValue = exports.numberToTwoDigitString = exports.countCards = exports.fillField = exports.deepCopy = void 0;
var types_1 = require("../types");
var deepCopy = function (any) {
    return JSON.parse(JSON.stringify(any));
};
exports.deepCopy = deepCopy;
var fillField = function (field, rawCards, isBoard) {
    for (var i = 0; i < rawCards.length; i = i + 2) {
        var rank = rawCards[i];
        var suit = rawCards[i + 1];
        var suitIndex = types_1.SUIT_INDEXES[suit];
        var rankIndex = types_1.RANK_INDEXES[rank];
        field[rankIndex][suitIndex] = isBoard ? types_1.BOARD_CARD : types_1.HAND_CARD;
        // additional Ace for easier straight checking in future
        if (rank === "A") {
            field[13][suitIndex] = isBoard ? types_1.BOARD_CARD : types_1.HAND_CARD;
        }
    }
};
exports.fillField = fillField;
// pass row or column of units from field and get number of cards there
var countCards = function (fieldUnits) {
    var count = 0;
    fieldUnits.forEach(function (unit) { return !!unit && count++; });
    return count;
};
exports.countCards = countCards;
var numberToTwoDigitString = function (input) {
    var temp = String(input);
    if (temp.length === 1) {
        temp = "0" + temp;
    }
    return temp;
};
exports.numberToTwoDigitString = numberToTwoDigitString;
var getStraightValue = function (fieldUnits) {
    var output = null;
    var endIndex = 13; // 13 cards + additional Ace = 14 total.
    // start from highest Ranking till index 4 (match Ranking 5)
    // no need to check below it because cant make a straight from 432Ax
    for (var i = endIndex; i >= 4; i--) {
        var straightCardCount = 0;
        // check 5 next cards to find straight
        for (var j = 0; j < 5; j++) {
            if (fieldUnits[i - j]) {
                straightCardCount++;
            }
            else {
                break;
            }
        }
        if (straightCardCount === 5) {
            output = i;
            break;
        }
    }
    return output;
};
exports.getStraightValue = getStraightValue;
var extractSingleSuitColumn = function (field, index) {
    var parsedIndex = typeof index === "number" ? index : types_1.SUIT_INDEXES[index];
    return field.map(function (row) { return row[parsedIndex]; });
};
exports.extractSingleSuitColumn = extractSingleSuitColumn;
var compressFieldToSingleColumn = function (field) {
    return field.map(function (row) {
        var hasBoardCard = row.includes(types_1.BOARD_CARD);
        var hasHandCard = row.includes(types_1.HAND_CARD);
        if (hasBoardCard && hasHandCard) {
            return types_1.BOTH_CARD;
        }
        if (hasHandCard) {
            return types_1.HAND_CARD;
        }
        if (hasBoardCard) {
            return types_1.BOARD_CARD;
        }
        return null;
    });
};
exports.compressFieldToSingleColumn = compressFieldToSingleColumn;
var getRankingIndexes = function (fieldUnits) {
    var indexes = [];
    fieldUnits.forEach(function (unit, index) {
        if (!!unit && index !== 0) {
            // cards A 9 7 5 2 => indexes = [1, 4, 6, 8, 13]
            indexes.push(index);
        }
    });
    // [13, 8, 6, 4, 1] => RANK_INDEXES => ["A", "9", "7", "5", "2"]
    indexes.reverse();
    return indexes;
};
exports.getRankingIndexes = getRankingIndexes;
var getFinalHandValue = function (player) {
    var handValue = null;
    types_1.CHECKERS.some(function (checker) {
        handValue = checker(player.field);
        if (!handValue) {
            return false;
        }
        player.finalHandValue = handValue;
        return true;
    });
};
exports.getFinalHandValue = getFinalHandValue;
