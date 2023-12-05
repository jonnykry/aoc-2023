import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day1input.txt', 'utf-8');
const lines = data.split(/\r?\n/);

// Part 1

// sum first digit and last digit of each calibration value
const sum = (data: string[]): number => {
    return data.reduce((acc, curr) => {
        const digits = curr.match(/[0-9]/g);
        let num = 0;

        if (digits && digits.length > 1) {
            const first = digits[0];
            const last = digits[digits.length - 1];
            num = Number(`${first}${last}`);
        } else if (digits && digits.length == 1) {
            // handle single numbers found for duplicates (i.e., 55)
            const first = digits[0];
            num = Number(`${first}${first}`);
        }

        return acc + num;
    }, 0);
};

let answer = sum(lines);
console.log(`The answer to Part One is ${answer}`);

// Part 2
// Note after solving:
// This could solve using a Trie – others used [Aho-Corasick](https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm).

const wvPair = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

/**
 * Takes a line and returns a new line containing only digits
 */
const parseLine = (line: string): string => {
    let newLine = '';

    for (let i = 0; i < line.length; i++) {
        // if it's a number, we take those!
        if (!isNaN(Number(line[i]))) {
            newLine += Number(line[i]);
        } else {
            // otherwise, try and find a word from the current location in the string
            // if none is found, that's fine, we don't need it for the resulting string either way
            for (let key of Object.keys(wvPair)) {
                if (line.substring(i, i + key.length) === key) {
                    newLine += wvPair[key as keyof typeof wvPair];
                }
            }
        }
    }

    return newLine;
};

const updatedLines = lines.map((line) => parseLine(line));
answer = sum(updatedLines);
console.log(`The answer to Part Two is ${answer}`);
