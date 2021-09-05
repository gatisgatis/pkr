"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHECKERS = exports.HAND_STRENGTHS = exports.RANK_INDEXES = exports.SUIT_INDEXES = exports.HIGH_CARD = exports.PAIR = exports.TWO_PAIR = exports.THREE_OF_KIND = exports.STRAIGHT = exports.FLUSH = exports.FULL_HOUSE = exports.FOUR_OF_KIND = exports.STRAIGHT_FLUSH = exports.FIVE_CARD_DRAW = exports.OMAHA_HOLDEM = exports.TEXAS_HOLDEM = exports.BOTH_CARD = exports.HAND_CARD = exports.BOARD_CARD = void 0;
var straight_flush_1 = require("./methods/straight-flush");
var four_of_kind_1 = require("./methods/four-of-kind");
var full_house_1 = require("./methods/full-house");
var flush_1 = require("./methods/flush");
var straigth_1 = require("./methods/straigth");
var three_of_kind_1 = require("./methods/three-of-kind");
var two_pair_1 = require("./methods/two-pair");
var pair_1 = require("./methods/pair");
var high_cards_1 = require("./methods/high-cards");
exports.BOARD_CARD = "BOARD_CARD";
exports.HAND_CARD = "HAND_CARD";
exports.BOTH_CARD = "BOTH_CARD"; // after compressing field, same Ranking card in hand and on board
exports.TEXAS_HOLDEM = "texas-holdem";
exports.OMAHA_HOLDEM = "omaha-holdem";
exports.FIVE_CARD_DRAW = "five-card-draw";
exports.STRAIGHT_FLUSH = "straight-flush";
exports.FOUR_OF_KIND = "for-of-kind";
exports.FULL_HOUSE = "full-house";
exports.FLUSH = "flush";
exports.STRAIGHT = "straight";
exports.THREE_OF_KIND = "three-of-kind";
exports.TWO_PAIR = "two-pair";
exports.PAIR = "pair";
exports.HIGH_CARD = "high-card";
exports.SUIT_INDEXES = {
    c: 0,
    d: 1,
    h: 2,
    s: 3,
};
exports.RANK_INDEXES = {
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
exports.HAND_STRENGTHS = {
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
exports.CHECKERS = [
    straight_flush_1.checkStraightFlush,
    four_of_kind_1.checkFourOfKind,
    full_house_1.checkFullHouse,
    flush_1.checkFlush,
    straigth_1.checkStraight,
    three_of_kind_1.checkThreeOfKind,
    two_pair_1.checkTwoPair,
    pair_1.checkPair,
    high_cards_1.checkHighCards,
];
