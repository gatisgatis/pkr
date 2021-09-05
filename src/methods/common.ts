import {
  BOARD_CARD,
  BOTH_CARD,
  Card,
  CHECKERS,
  FieldUnit,
  HAND_CARD,
  HandValue,
  Player,
  RANK_INDEXES,
  Ranking,
  Suit,
  SUIT_INDEXES,
} from "../types";

export const deepCopy = (any: any) => {
  return JSON.parse(JSON.stringify(any));
};

export const fillField = (
  field: FieldUnit[][],
  rawCards: Card[],
  isBoard: boolean
): void => {
  for (let i = 0; i < rawCards.length; i = i + 2) {
    const rank = rawCards[i] as Ranking;
    const suit = rawCards[i + 1] as Suit;
    const suitIndex = SUIT_INDEXES[suit];
    const rankIndex = RANK_INDEXES[rank];
    field[rankIndex][suitIndex] = isBoard ? BOARD_CARD : HAND_CARD;
    // additional Ace for easier straight checking in future
    if (rank === "A") {
      field[13][suitIndex] = isBoard ? BOARD_CARD : HAND_CARD;
    }
  }
};

// pass row or column of units from field and get number of cards there
export const countCards = (fieldUnits: FieldUnit[]): number => {
  let count = 0;
  fieldUnits.forEach((unit) => !!unit && count++);
  return count;
};

export const numberToTwoDigitString = (input: number): string => {
  let temp = String(input);
  if (temp.length === 1) {
    temp = "0" + temp;
  }
  return temp;
};

export const getStraightValue = (fieldUnits: FieldUnit[]): number | null => {
  let output = null;
  const endIndex = 13; // 13 cards + additional Ace = 14 total.
  // start from highest Ranking till index 4 (match Ranking 5)
  // no need to check below it because cant make a straight from 432Ax
  for (let i = endIndex; i >= 4; i--) {
    let straightCardCount = 0;
    // check 5 next cards to find straight
    for (let j = 0; j < 5; j++) {
      if (fieldUnits[i - j]) {
        straightCardCount++;
      } else {
        break;
      }
    }
    if (straightCardCount === 5) {
      output = i;
      break;
    }
  }
  return output;
};

export const extractSingleSuitColumn = (
  field: FieldUnit[][],
  index: number | Suit
): FieldUnit[] => {
  const parsedIndex = typeof index === "number" ? index : SUIT_INDEXES[index];
  return field.map((row) => row[parsedIndex]);
};

export const compressFieldToSingleColumn = (field: FieldUnit[][]) => {
  return field.map((row) => {
    const hasBoardCard = row.includes(BOARD_CARD);
    const hasHandCard = row.includes(HAND_CARD);
    if (hasBoardCard && hasHandCard) {
      return BOTH_CARD;
    }
    if (hasHandCard) {
      return HAND_CARD;
    }
    if (hasBoardCard) {
      return BOARD_CARD;
    }
    return null;
  });
};

export const getRankingIndexes = (fieldUnits: FieldUnit[]) => {
  const indexes: number[] = [];
  fieldUnits.forEach((unit, index) => {
    if (!!unit && index !== 0) {
      // cards A 9 7 5 2 => indexes = [1, 4, 6, 8, 13]
      indexes.push(index);
    }
  });
  // [13, 8, 6, 4, 1] => RANK_INDEXES => ["A", "9", "7", "5", "2"]
  indexes.reverse();
  return indexes;
};

export const getFinalHandValue = (player: Player) => {
  let handValue: HandValue = null;
  CHECKERS.some((checker) => {
    handValue = checker(player.field);
    if (!handValue) {
      return false;
    }
    player.finalHandValue = handValue;
    return true;
  });
};
