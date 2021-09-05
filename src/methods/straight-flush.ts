import {
  FieldUnit,
  HAND_STRENGTHS,
  HandValue,
  STRAIGHT_FLUSH,
  Suit,
  SUIT_INDEXES,
} from "../types";
import {
  extractSingleSuitColumn,
  getStraightValue,
  numberToTwoDigitString,
} from "./common";

// Ace High straight would be
// 8 + 13 + 00 00 00 00 = 81300000000
// 8 high straight would be
// 8 + 07 + 00 00 00 00 = 80700000000

export const checkStraightFlush = (field: FieldUnit[][]): HandValue => {
  let output: HandValue = null;
  Object.keys(SUIT_INDEXES).some((suit) => {
    const singleSuitColumn = extractSingleSuitColumn(field, suit as Suit);
    const straightValue = getStraightValue(singleSuitColumn);
    if (!straightValue) {
      return false;
    }
    let outputString = String(HAND_STRENGTHS[STRAIGHT_FLUSH]);
    outputString += numberToTwoDigitString(straightValue);
    outputString += "00000000";
    output = Number(outputString);
    return true;
  });
  return output;
};
