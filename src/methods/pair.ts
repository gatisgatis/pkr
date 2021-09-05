import { FieldUnit, HAND_STRENGTHS, HandValue, PAIR } from "../types";
import { countCards, numberToTwoDigitString } from "./common";

// KKAJ8 would be
// 1 + 12 + 13 + 11 + 07 + 00 = 11213110700

export const checkPair = (
  field: FieldUnit[][],
  excludeRankIndex: number | null = null
): HandValue => {
  let output: HandValue = null;
  const endIndex = 13; // 13 cards + additional Ace = 14 total.
  for (let i = endIndex; i > 0; i--) {
    const count = countCards(field[i]);
    if (count === 2 && i !== excludeRankIndex) {
      let outputString = String(HAND_STRENGTHS[PAIR]);
      outputString += numberToTwoDigitString(i);
      let currentHighCardIndex = 1;
      const maxHighCardCount = 3;
      for (let j = endIndex; j >= 0; j--) {
        let hasHighCard = countCards(field[j]) === 1;
        if (hasHighCard) {
          outputString += numberToTwoDigitString(j);
          currentHighCardIndex++;
          if (currentHighCardIndex > maxHighCardCount) {
            outputString += "00";
            output = Number(outputString);
            break;
          }
        }
      }
      break;
    }
  }
  return output;
};
