import { parseFile } from './utils';

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
        this.destination = new Range(destination, destination + length);
        this.source = new Range(source, source + length);
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

        // no intersection found, return ordinary range
        if (!intersection) return [range];

        // construct new range after applying destination difference
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
    mappedRange: MappedRange[],
    seeds: number[]
): number[] => {
    let result = [];

    for (let seed of seeds) {
        result.push(
            mappedRange.reduce((mappedSeed, range) => {
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

const processMappedRangeGroupings = (lines: string[]) => {
    let mapRangeGroups: MappedRange[][] = [];
    mapRangeGroups.push([]);

    for (let line of lines) {
        line = line.trim();
        if (line === '') {
            mapRangeGroups.push([]);
        } else if (!line.includes('map')) {
            let [dest, src, size] = line
                .trim()
                .split(' ')
                .map((num) => parseInt(num));

            mapRangeGroups[mapRangeGroups.length - 1].push(
                new MappedRange(dest, src, size)
            );
        }
    }

    return mapRangeGroups;
};

export const partOne = (data: string): number => {
    let lines = data.split(/\n/);
    let seeds: number[] = processSeeds(lines);
    lines = lines.slice(2);

    let mappedRangeGroupings: MappedRange[][] =
        processMappedRangeGroupings(lines);

    for (let groupedMapRange of mappedRangeGroupings) {
        seeds = mapSeedsToCategory(groupedMapRange, seeds);
    }

    return Math.min(...seeds);
};

export const partTwo = (data: string): number => {
    let lines = data.split(/\n/);
    let seedRanges: Range[] = processSeedRanges(lines);
    lines = lines.slice(2);

    let mappedRangeGroupings: MappedRange[][] =
        processMappedRangeGroupings(lines);

    for (let groupedMapRange of mappedRangeGroupings) {
        seedRanges = mapSeedRangesToCategory(groupedMapRange, seedRanges);
    }

    let min = Infinity;
    seedRanges.map((range) => {
        min = Math.min(range.start, min);
    });

    return min;
};

const data = await parseFile('day5input.txt');

let solution = partOne(data);

console.log(`Part One solution: ${solution}`);

solution = partTwo(data);
console.log(`Part Two solution: ${solution}`);
