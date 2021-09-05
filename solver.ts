import { Card, FieldUnit, FIVE_CARD_DRAW, GameType, Player } from "./src/types";

import { deepCopy, fillField, getFinalHandValue } from "./src/methods/common";

const EMPTY_FIELD: FieldUnit[][] = [];
for (let i = 0; i < 14; i++) {
  let row = [];
  for (let j = 0; j < 4; j++) {
    row.push(null);
  }
  EMPTY_FIELD.push(row);
  row = [];
}

export class Solver {
  process(line: string) {
    const inputParts = line.split(" ");

    const field = deepCopy(EMPTY_FIELD);

    const gameType = inputParts[0] as GameType;

    // ex. ["5", "s", "A", "h", "J", "d", "4", "d", "2", "d"]
    const rawBoard =
      gameType !== FIVE_CARD_DRAW ? (inputParts[1].split("") as Card[]) : null;

    if (rawBoard) {
      fillField(field, rawBoard, true);
    }

    // ex. [["A", "s", "J", "c"], ["K", "d", "4", "h"]]
    const rawPlayersStartingHands: Card[][] = [];

    const startIndex = gameType !== FIVE_CARD_DRAW ? 2 : 1;

    for (let i = startIndex; i < inputParts.length; i++) {
      rawPlayersStartingHands.push(inputParts[i].split("") as Card[]);
    }

    const players: Player[] = rawPlayersStartingHands.map((rawHand) => {
      const playersField = deepCopy(field);
      fillField(playersField, rawHand, false);
      return {
        startingHand: rawHand.join(""),
        field: playersField,
        finalHandValue: null,
      };
    });

    players.forEach((player) => {
      getFinalHandValue(player);
    });

    // sort starting from strongest
    players.sort(
      (prev, next) => (next.finalHandValue || 0) - (prev.finalHandValue || 0)
    );
    // reverse for correct output string
    players.reverse();

    // generate output string
    let output = "";
    players.forEach((player, index) => {
      output += player.startingHand;
      if (index + 1 < players.length) {
        const nextPlayersHandValue = players[index + 1].finalHandValue;
        if (nextPlayersHandValue === player.finalHandValue) {
          output += "=";
        } else {
          output += " ";
        }
      }
    });

    return output;
  }
}
