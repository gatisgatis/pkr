# Poker Hand Strength Evaluator

- Added typescript and prettier for better development experience

- Solver fully supports Texas Holdem and Five Card Draw. It is not capable 
to solve Omaha game for now although it passed all three sample tests.
  

- Here is simple example of how algorithm works:

input: "texas holdem KsAd8h9d9h 9sJh"

Generate 2D array from combination of board and starting hand. Array consists
of 14 smaller 4-element arrays. 14 elements represents 13 different rank cards
and 1 additional Ace. 4 element arrays represents 4 possible suits. In 9sJh case
array would look like this:

    [
      [null, BOARD(Ad), null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, BOARD(8h), null],
      [null, BOARD(9d), BOARD(9h), HAND(9s)],
      [null, null, null, null],
      [null, null, HAND(Jh), null],
      [null, null, null, null],
      [null, null, null, BOARD(Ks)],
      [null, BOARD(Ad), null, null],
    ]

After that solver runs all possible combination checks starting from strongest 
(straight-flush) till weakest (high-cards). When combination found, solver 
generates 11 digit combination's value. In this case solver would find 
3 of a kind 9d9h9sAdKs (three nines with Ace and King high cards) 

Eleven digit value would be:

    3 - combination strength (straight = 4, flush = 5, two-pair = 2, full-house = 6)
    08 - trips strength (999 = 08, AAA = 13, KKK = 12, 222 = 01)
    13 - first high card strength (A = 13, K = 12, 9 = 08)
    12 - second high card strength 
    0000 - not important digits just to make all combination values be 11 digit number

    that makes it 30813120000

After solver finds 11-digit hand values for all input hands
it sorts by this value and generates output string.