import {
  FieldUnit,
  HAND_STRENGTHS,
  HandValue,
  THREE_OF_KIND,
} from "../types";
import { countCards, numberToTwoDigitString } from "./common";

// KKKJ8 would be
// 3 + 12 + 11 + 07 00 00 = 31211070000
// 999A4
// 3 + 08 + 13 + 03 + 00 00 = 30813030000

export const checkThreeOfKind = (field: FieldUnit[][]): HandValue => {
  let output: HandValue = null;
  const endIndex = 13; // 13 cards + additional Ace = 14 total.
  for (let i = endIndex; i >= 0; i--) {
    const count = countCards(field[i]);
    if (count === 3) {
      let outputString = String(HAND_STRENGTHS[THREE_OF_KIND]);
      outputString += numberToTwoDigitString(i);
      let currentHighCardIndex = 1;
      const maxHighCardCount = 2;
      for (let j = endIndex; j >= 0; j--) {
        const hasHighCard = countCards(field[j]) === 1;
        if (hasHighCard) {
          outputString += numberToTwoDigitString(j);
          currentHighCardIndex++;
          if (currentHighCardIndex > maxHighCardCount) {
            outputString += "0000";
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
