import { describe, it, expect } from 'bun:test';
import { partOne } from './day11';

describe('part 1 example', () => {
    const example = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

    it('should return the correct output from the example', () => {
        const result = partOne(example);

        expect(result).toEqual(374);
    });
});
