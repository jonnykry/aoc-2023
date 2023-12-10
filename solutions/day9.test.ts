import { describe, it, expect } from 'bun:test';
import { partOne, partTwo } from './day9';

describe('part 1 example', () => {
    const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

    it('should return the correct output from the example', () => {
        const result = partOne(example);

        expect(result).toEqual(114);
    });
});

describe('part 2 example', () => {
    const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

    it('should return the correct output from the example', () => {
        const result = partTwo(example);

        expect(result).toEqual(2);
    });
});
