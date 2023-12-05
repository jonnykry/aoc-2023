import { parseFileLines } from './utils';

class Range {
    destinationStart: number;
    destinationEnd: number;
    sourceStart: number;
    sourceEnd: number;
    length: number;

    constructor(destination: number, source: number, length: number) {
        this.destinationStart = destination;
        this.destinationEnd = destination + length - 1;
        this.sourceStart = source;
        this.sourceEnd = source + length - 1;
        this.length = length;
    }

    findDestination(value: number): number | null {
        if (value >= this.sourceStart && value <= this.sourceEnd) {
            return this.destinationStart + (value - this.sourceStart);
        }

        return null;
    }
}

const mapSeedsToCategory = (ranges: Range[], seeds: number[]): number[] => {
    let result = [];

    for (let seed of seeds) {
        result.push(
            ranges.reduce((mappedSeed, range) => {
                const newDest = range.findDestination(seed);
                return newDest !== null ? newDest : mappedSeed;
            }, seed)
        );
    }

    return result;
};

const processSeeds = (lines: string[]): number[] => {
    const seeds = lines[0]
        .split(': ')[1]
        .split(' ')
        .map((num) => parseInt(num));

    // remove first and second lines after processing
    lines.shift();
    lines.shift();

    return seeds;
};

export const partOne = (lines: string[]): number => {
    let seeds = processSeeds(lines);

    let ranges: Range[] = [];
    for (let line of lines) {
        line = line.trim();

        // beginning of new chunk
        if (line === '') {
            seeds = [...mapSeedsToCategory(ranges, seeds)];
            ranges = [];
        } else if (!line.includes('map')) {
            let [dest, src, size] = line
                .trim()
                .split(' ')
                .map((num) => parseInt(num));

            ranges.push(new Range(dest, src, size));
        }
    }

    return Math.min(...seeds);
};

const lines = await parseFileLines('day5input.txt');
const solution = partOne(lines);

console.log(`Part One solution: ${solution}`);
