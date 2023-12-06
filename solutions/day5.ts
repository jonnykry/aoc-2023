import { parseFileLines } from './utils';

class Range {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    isInRange(value: number) {
        return value >= this.start && value <= this.end;
    }

    findIntersection(target: Range): Range | null {
        if (this.end <= target.start || this.start >= target.end) return null;

        const start = Math.max(target.start, this.start);
        const end = Math.min(target.end, this.end);

        return new Range(start, end);
    }
}

class MappedRange {
    destination: Range;
    source: Range;

    constructor(destination: number, source: number, length: number) {
        this.destination = new Range(destination, destination + length - 1);
        this.source = new Range(source, source + length - 1);
    }

    findDestination(value: number): number | null {
        if (this.source.isInRange(value)) {
            return this.destination.start + (value - this.source.start);
        }

        return null;
    }

    findMappedRangeIntersection(range: Range): Range[] {
        // once we have intersection, apply this intersection range
        // and subtract difference from dest range
        const intersection = this.source.findIntersection(range);

        if (!intersection) return [range];

        // construct new range after augmenting destination
        let results = [];
        const difference = this.destination.start - this.source.start;
        results.push(
            new Range(
                intersection.start + difference,
                intersection.end + difference
            )
        );

        // need left and right ranges outside of intersection from original range
        if (range.start < intersection.start) {
            results.push(new Range(range.start, intersection.start));
        }

        if (range.end > intersection.end) {
            results.push(new Range(range.end, intersection.end));
        }

        return [...results];
    }
}

const mapSeedsToCategory = (
    MappedRange: MappedRange[],
    ranges: number[]
): number[] => {
    let result = [];

    for (let seed of ranges) {
        result.push(
            MappedRange.reduce((mappedSeed, range) => {
                const newDest = range.findDestination(seed);
                return newDest !== null ? newDest : mappedSeed;
            }, seed)
        );
    }

    return result;
};

const mapSeedRangesToCategory = (
    mappedRange: MappedRange[],
    ranges: Range[]
): Range[] => {
    let result: Range[] = [];

    for (const mRange of mappedRange) {
        result = ranges.flatMap((range) => {
            return mRange.findMappedRangeIntersection(range);
        });
    }

    return result;
};

const processSeeds = (lines: string[]): number[] => {
    const seeds = lines[0]
        .split(': ')[1]
        .split(' ')
        .map((num) => parseInt(num));

    return seeds;
};

const processSeedRanges = (lines: string[]): Range[] => {
    let seeds = processSeeds(lines);
    let seedRanges: Range[] = [];

    for (let i = 0; i < seeds.length; i += 2) {
        const start = seeds[i];
        const length = seeds[i + 1];

        seedRanges.push(new Range(start, start + length - 1));
    }

    return seedRanges;
};

export const partOne = (lines: string[]): number => {
    let seeds = processSeeds(lines);
    lines = lines.slice(2);

    let mRanges: MappedRange[] = [];
    for (let line of lines) {
        line = line.trim();

        // beginning of new chunk
        if (line === '') {
            seeds = mapSeedsToCategory(mRanges, seeds);
            mRanges = [];
        } else if (!line.includes('map')) {
            let [dest, src, size] = line
                .trim()
                .split(' ')
                .map((num) => parseInt(num));

            mRanges.push(new MappedRange(dest, src, size));
        }
    }

    return Math.min(...seeds);
};

export const partTwo = (lines: string[]): number => {
    let seedRanges: Range[] = processSeedRanges(lines);
    lines = lines.slice(2);

    let mRanges: MappedRange[] = [];
    for (let line of lines) {
        line = line.trim();

        // beginning of new chunk
        if (line === '') {
            seedRanges = mapSeedRangesToCategory(mRanges, seedRanges);
            mRanges = [];
        } else if (!line.includes('map')) {
            let [dest, src, size] = line
                .trim()
                .split(' ')
                .map((num) => parseInt(num));

            mRanges.push(new MappedRange(dest, src, size));
        }
    }

    let min = Infinity;
    seedRanges.map((range) => {
        min = Math.min(range.start, min);
    });

    return min;
};

const lines = await parseFileLines('day5input.txt');

let tempLines = [...lines];
let solution = partOne(tempLines);

console.log(`Part One solution: ${solution}`);

solution = partTwo(lines);
console.log(`Part Two solution: ${solution}`);
