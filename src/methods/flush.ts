import {
  FieldUnit,
  FLUSH,
  HAND_STRENGTHS,
  HandValue,
  Suit,
  SUIT_INDEXES,
} from "../types";
import {
  countCards,
  extractSingleSuitColumn,
  getRankingIndexes,
  numberToTwoDigitString,
} from "./common";

// AJ542 flush would be
// 5 + 13 + 10 + 04 + 03 + 01 = 51310040301

export const checkFlush = (field: FieldUnit[][]): HandValue => {
  let output: HandValue = null;
  Object.keys(SUIT_INDEXES).some((suit) => {
    const singleSuitColumn = extractSingleSuitColumn(field, suit as Suit);
    // do not count double Ace
    const isFlush =
      countCards(singleSuitColumn.slice(0, singleSuitColumn.length - 1)) >= 5;
    if (!isFlush) {
      // go to next iteration / check next suit
      return false;
    }
    let outputString = String(HAND_STRENGTHS[FLUSH]);
    const indexes: number[] = getRankingIndexes(singleSuitColumn);
    const maxRankCardCount = 5;
    for (let i = 0; i < maxRankCardCount; i++) {
      const index = indexes[i];
      outputString += numberToTwoDigitString(index);
    }
    output = Number(outputString);
    // break 'some' loop
    return true;
  });

  return output;
};
