import { describe, it, expect } from 'bun:test';
import { partOne, partTwo } from './day7';

describe('part 1 example', () => {
    it('should return the correct output from the example', () => {
        const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
        // const result = partOne(example);

        // expect(result).toEqual(6440);
    });
});

describe('part 2 example', () => {
    it('should return the correct output from the example', () => {
        const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
        // const result = partTwo(example);

        // expect(result).toEqual(5905);
    });
});

describe('part 1 tests', () => {
    it('should return the correct output from the example', () => {
        const example = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;
        // const result = partOne(example);

        // expect(result).toEqual(6592);
    });
});

describe('part 2 tests', () => {
    it('should return the correct output from the example', () => {
        const example = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;
        const result = partTwo(example);

        expect(result).toEqual(6592);
    });
});
