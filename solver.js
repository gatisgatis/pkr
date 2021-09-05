"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
var types_1 = require("./src/types");
var common_1 = require("./src/methods/common");
var EMPTY_FIELD = [];
for (var i = 0; i < 14; i++) {
    var row = [];
    for (var j = 0; j < 4; j++) {
        row.push(null);
    }
    EMPTY_FIELD.push(row);
    row = [];
}
var Solver = /** @class */ (function () {
    function Solver() {
    }
    Solver.prototype.process = function (line) {
        var inputParts = line.split(" ");
        var field = (0, common_1.deepCopy)(EMPTY_FIELD);
        var gameType = inputParts[0];
        // ex. ["5", "s", "A", "h", "J", "d", "4", "d", "2", "d"]
        var rawBoard = gameType !== types_1.FIVE_CARD_DRAW ? inputParts[1].split("") : null;
        if (rawBoard) {
            (0, common_1.fillField)(field, rawBoard, true);
        }
        // ex. [["A", "s", "J", "c"], ["K", "d", "4", "h"]]
        var rawPlayersStartingHands = [];
        var startIndex = gameType !== types_1.FIVE_CARD_DRAW ? 2 : 1;
        for (var i = startIndex; i < inputParts.length; i++) {
            rawPlayersStartingHands.push(inputParts[i].split(""));
        }
        var players = rawPlayersStartingHands.map(function (rawHand) {
            var playersField = (0, common_1.deepCopy)(field);
            (0, common_1.fillField)(playersField, rawHand, false);
            return {
                startingHand: rawHand.join(""),
                field: playersField,
                finalHandValue: null,
            };
        });
        players.forEach(function (player) {
            (0, common_1.getFinalHandValue)(player);
        });
        // sort starting from strongest
        players.sort(function (prev, next) { return (next.finalHandValue || 0) - (prev.finalHandValue || 0); });
        // reverse for correct output string
        players.reverse();
        // generate output string
        var output = "";
        players.forEach(function (player, index) {
            output += player.startingHand;
            if (index + 1 < players.length) {
                var nextPlayersHandValue = players[index + 1].finalHandValue;
                if (nextPlayersHandValue === player.finalHandValue) {
                    output += "=";
                }
                else {
                    output += " ";
                }
            }
        });
        return output;
    };
    return Solver;
}());
exports.Solver = Solver;
