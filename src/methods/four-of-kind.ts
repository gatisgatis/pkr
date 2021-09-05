import {
  FieldUnit,
  FOUR_OF_KIND,
  HAND_STRENGTHS,
  HandValue,
} from "../types";
import { countCards, numberToTwoDigitString } from "./common";

// KKKK8
// 7 + 12 + 07 + 00 00 00 = 71207000000
// JJJJA
// 7 + 11 + 13 +  00 00 00 = 71113000000

export const checkFourOfKind = (field: FieldUnit[][]): HandValue => {
  let output: HandValue = null;
  const endIndex = 13; // 13 cards + additional Ace = 14 total.
  for (let i = endIndex; i >= 0; i--) {
    const count = countCards(field[i]);
    if (count === 4) {
      for (let j = endIndex; j >= 0; j--) {
        const hasHighCard = countCards(field[j]) === 1;
        if (hasHighCard) {
          let outputString = String(HAND_STRENGTHS[FOUR_OF_KIND]);
          outputString += numberToTwoDigitString(i);
          outputString += numberToTwoDigitString(j);
          outputString += "000000";
          output = Number(outputString);
          break;
        }
      }
      break;
    }
  }
  return output;
};
