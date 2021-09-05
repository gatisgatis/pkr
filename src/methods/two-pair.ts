import { FieldUnit, HAND_STRENGTHS, HandValue, TWO_PAIR } from "../types";
import { checkPair } from "./pair";
import { countCards, numberToTwoDigitString } from "./common";

// KKTT8 would be
// 2 + 12 + 09 + 07 + 00 00 = 21209070000

export const checkTwoPair = (field: FieldUnit[][]): HandValue => {
  const pairOneValue = checkPair(field);
  if (!pairOneValue) {
    return null;
  }
  const pairOneRankIndex = String(pairOneValue).slice(1, 3);
  const pairTwoValue = checkPair(field, Number(pairOneRankIndex));
  if (!pairTwoValue) {
    return null;
  }
  let outputString = String(HAND_STRENGTHS[TWO_PAIR]);
  outputString += pairOneRankIndex;
  const pairTwoRankIndex = String(pairTwoValue).slice(1, 3);
  outputString += pairTwoRankIndex;
  const endIndex = 13; // 13 cards + additional Ace = 14 total.
  for (let j = endIndex; j >= 0; j--) {
    const count = countCards(field[j]);
    let hasHighCard = count === 1;
    // Handle 3 pair situations.
    if (count === 2) {
      if (j !== Number(pairOneRankIndex) && j !== Number(pairTwoRankIndex)) {
        hasHighCard = true;
      }
    }
    if (hasHighCard) {
      outputString += numberToTwoDigitString(j);
      outputString += "0000";
      break;
    }
  }
  return Number(outputString);
};
