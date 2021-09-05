import { checkStraightFlush } from "./methods/straight-flush";
import { checkFourOfKind } from "./methods/four-of-kind";
import { checkFullHouse } from "./methods/full-house";
import { checkFlush } from "./methods/flush";
import { checkStraight } from "./methods/straigth";
import { checkThreeOfKind } from "./methods/three-of-kind";
import { checkTwoPair } from "./methods/two-pair";
import { checkPair } from "./methods/pair";
import { checkHighCards } from "./methods/high-cards";

export type Suit = "s" | "c" | "h" | "d";
export type Ranking =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type Card = Suit | Ranking;

export const BOARD_CARD = "BOARD_CARD";
export const HAND_CARD = "HAND_CARD";
export const BOTH_CARD = "BOTH_CARD"; // after compressing field, same Ranking card in hand and on board

export type FieldUnit =
  | typeof BOARD_CARD
  | typeof HAND_CARD
  | typeof BOTH_CARD
  | null;

export const TEXAS_HOLDEM = "texas-holdem";
export const OMAHA_HOLDEM = "omaha-holdem";
export const FIVE_CARD_DRAW = "five-card-draw";

export const STRAIGHT_FLUSH = "straight-flush";
export const FOUR_OF_KIND = "for-of-kind";
export const FULL_HOUSE = "full-house";
export const FLUSH = "flush";
export const STRAIGHT = "straight";
export const THREE_OF_KIND = "three-of-kind";
export const TWO_PAIR = "two-pair";
export const PAIR = "pair";
export const HIGH_CARD = "high-card";

export type HandStrength =
  | typeof STRAIGHT_FLUSH
  | typeof FOUR_OF_KIND
  | typeof FULL_HOUSE
  | typeof FLUSH
  | typeof STRAIGHT
  | typeof THREE_OF_KIND
  | typeof TWO_PAIR
  | typeof PAIR
  | typeof HIGH_CARD;

export type GameType =
  | typeof TEXAS_HOLDEM
  | typeof OMAHA_HOLDEM
  | typeof FIVE_CARD_DRAW;

export const SUIT_INDEXES: Record<Suit, number> = {
  c: 0,
  d: 1,
  h: 2,
  s: 3,
};

export const RANK_INDEXES: Record<Ranking, number> = {
  A: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
};

export const HAND_STRENGTHS: Record<HandStrength, number> = {
  "straight-flush": 8,
  "for-of-kind": 7,
  "full-house": 6,
  flush: 5,
  straight: 4,
  "three-of-kind": 3,
  "two-pair": 2,
  pair: 1,
  "high-card": 0,
};

// 11 digit number consisting HAND_STRENGTHS value as a first digit and combination's specific value as next digits (tie breakers)
export type HandValue = number | null;

export interface Player {
  startingHand: string;
  finalHandValue: HandValue;
  field: FieldUnit[][];
}

export const CHECKERS = [
  checkStraightFlush,
  checkFourOfKind,
  checkFullHouse,
  checkFlush,
  checkStraight,
  checkThreeOfKind,
  checkTwoPair,
  checkPair,
  checkHighCards,
];
