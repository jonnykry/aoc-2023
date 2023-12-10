import { parseFile } from './utils';

const solve = (lines: string[], isPartTwo: boolean = false) => {
    let results: number[] = [];

    lines.map((line: string) => {
        let values = line.split(' ').map((val) => parseInt(val));

        let sideValues = [];
        sideValues.push(values[isPartTwo ? 0 : values.length - 1]);
        while (true) {
            let sequence = [];

            if (isPartTwo) {
                for (let i = values.length - 2; i >= 0; i--) {
                    sequence.unshift(values[i + 1] - values[i]);
                }
            } else {
                for (let i = 1; i < values.length; i++) {
                    sequence.push(values[i] - values[i - 1]);
                }
            }

            sideValues.unshift(
                isPartTwo ? sequence[0] : sequence[sequence.length - 1]
            );

            if (sequence.filter((val) => val !== 0).length === 0) {
                break;
            } else {
                values = sequence;
            }
        }

        let newSequence = [0];
        for (let i = 1; i < sideValues.length; i++) {
            newSequence.push(
                isPartTwo
                    ? sideValues[i] - newSequence[newSequence.length - 1]
                    : sideValues[i] + newSequence[newSequence.length - 1]
            );
        }

        results.push(newSequence[newSequence.length - 1]);
    });

    return results.reduce((sum, curr) => sum + curr, 0);
};

export const partOne = (data: string): number => {
    const lines = data.split(/\n/);
    return solve(lines, false);
};

export const partTwo = (data: string): number => {
    let lines = data.split(/\n/);
    return solve(lines, true);
};

const data = await parseFile('day9input.txt');

console.log(partOne(data));

console.log(partTwo(data));
