import { FieldUnit, HAND_STRENGTHS, HandValue, STRAIGHT } from "../types";
import {
  compressFieldToSingleColumn,
  getStraightValue,
  numberToTwoDigitString,
} from "./common";

// Ace high straight would be
// 4 + 13 + 00 00 00 00 = 41300000000

export const checkStraight = (field: FieldUnit[][]): HandValue => {
  let output: HandValue | null = null;
  const compressed = compressFieldToSingleColumn(field);
  const straightRank = getStraightValue(compressed);
  if (!!straightRank) {
    let outputString = String(HAND_STRENGTHS[STRAIGHT]);
    outputString += numberToTwoDigitString(straightRank);
    outputString += "00000000";
    output = Number(outputString);
  }
  return output;
};
