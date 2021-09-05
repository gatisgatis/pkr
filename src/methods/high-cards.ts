import { FieldUnit, HAND_STRENGTHS, HandValue, HIGH_CARD } from "../types";
import {
  compressFieldToSingleColumn,
  getRankingIndexes,
  numberToTwoDigitString,
} from "./common";

export const checkHighCards = (field: FieldUnit[][]): HandValue => {
  const compressed = compressFieldToSingleColumn(field);
  const indexes = getRankingIndexes(compressed);
  const maxHighCardCount = 5;
  let outputString = String(HAND_STRENGTHS[HIGH_CARD]);
  for (let i = 0; i < maxHighCardCount; i++) {
    const index = indexes[i];
    outputString += numberToTwoDigitString(index);
  }
  return Number(outputString);
};
