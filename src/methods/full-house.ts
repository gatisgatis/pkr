import { FieldUnit, FULL_HOUSE, HAND_STRENGTHS, HandValue } from "../types";
import { checkThreeOfKind } from "./three-of-kind";
import { checkPair } from "./pair";

// KKK88 would be
// 6 + 12 + 07 + 00 00 00 = 61207000000

export const checkFullHouse = (field: FieldUnit[][]): HandValue => {
  const threeCardValue = checkThreeOfKind(field);
  if (!threeCardValue) {
    return null;
  }
  const threeCardValueAsString = String(threeCardValue);
  const threeCardRankIndex = threeCardValueAsString.slice(1, 3);
  const twoCardValue = checkPair(field, Number(threeCardRankIndex));
  if (!twoCardValue) {
    return null;
  }
  let outputString = String(HAND_STRENGTHS[FULL_HOUSE]);
  outputString += threeCardRankIndex;
  const twoCardValueAsString = String(twoCardValue);
  const twoCardRankIndex = twoCardValueAsString.slice(1, 3);
  outputString += twoCardRankIndex;
  outputString += "000000";
  return Number(outputString);
};
