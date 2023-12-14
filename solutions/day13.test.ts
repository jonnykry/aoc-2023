import { describe, it, expect } from 'bun:test';
import { solve } from './day13';

describe('part 1 example', () => {
    const example = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

    it('should return the correct output from the example', () => {
        const result = solve(example);

        expect(result).toEqual(405);
    });
});
