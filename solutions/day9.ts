import { parseFile } from './utils';

const solve = (lines: string[]) => {};

export const partOne = (data: string): number => {
    const lines = data.split(/\n/);
    let results: number[] = [];

    lines.map((line: string) => {
        let values = line.split(' ').map((val) => parseInt(val));

        let rightSideValues = [];
        rightSideValues.unshift(values[values.length - 1]);
        while (true) {
            let sequence = [];

            for (let i = 1; i < values.length; i++) {
                sequence.push(values[i] - values[i - 1]);
            }

            rightSideValues.unshift(sequence[sequence.length - 1]);

            if (sequence.filter((val) => val !== 0).length === 0) {
                break;
            } else {
                values = sequence;
            }
        }

        let newSequence = [0];
        for (let i = 1; i < rightSideValues.length; i++) {
            newSequence.push(
                rightSideValues[i] + newSequence[newSequence.length - 1]
            );
        }

        results.push(newSequence[newSequence.length - 1]);
    });

    return results.reduce((sum, curr) => sum + curr, 0);
};

export const partTwo = (data: string): number => {
    let lines = data.split(/\n/);
    let results: number[] = [];

    lines.map((line: string) => {
        let values = line.split(' ').map((val) => parseInt(val));

        let leftSideValues = [];
        leftSideValues.push(values[0]);
        while (true) {
            let sequence = [];

            for (let i = values.length - 2; i >= 0; i--) {
                sequence.unshift(values[i + 1] - values[i]);
            }

            leftSideValues.unshift(sequence[0]);

            if (sequence.filter((val) => val !== 0).length === 0) {
                break;
            } else {
                values = sequence;
            }
        }

        let newSequence = [0];
        for (let i = 1; i < leftSideValues.length; i++) {
            newSequence.push(
                leftSideValues[i] - newSequence[newSequence.length - 1]
            );
        }

        results.push(newSequence[newSequence.length - 1]);
    });

    return results.reduce((sum, curr) => sum + curr, 0);
};

const data = await parseFile('day9input.txt');

console.log(partOne(data));

console.log(partTwo(data));
