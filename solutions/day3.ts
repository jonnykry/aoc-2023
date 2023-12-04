import { readFileSync } from 'fs';

/**
 * Checks if a location in matrix is valid provided a row and col
 */
const isWithinBounds = (row: number, col: number) => {
    if (
        row < matrix.length &&
        row >= 0 &&
        col < matrix[row].length &&
        col >= 0
    ) {
        return matrix[row][col];
    } else {
        return null;
    }
};

/**
 * Returns true if the passed string is a number
 */
const isNumber = (val: string) => {
    return !isNaN(Number(val));
};

/**
 * Print perimeter around grid from row and col. Useful for debugging.
 */
const _printGrid = (row: number, col: number) => {
    let result = ``;

    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
        let resultRow = ``;

        for (let newCol = col - 1; newCol <= col + 1; newCol++) {
            resultRow = isWithinBounds(newRow - 1, newCol - 1)
                ? `${resultRow} ${matrix[newRow][newCol]}`
                : resultRow;
        }

        result += `${resultRow}\n`;
    }

    console.log(result);
};

const data = readFileSync('./inputs/day3input.txt', 'utf-8');
const lines = data.split(/\r?\n/);
const matrix: string[][] = [];
const symbolCoords: number[][] = [];
const symbolRegExp = new RegExp('[^0-9|.]', 'g');

let sum = 0;
let gearRatioSum = 0;

// build 2-D matrix and keep track of all symbols along the way
lines.map((line: string, row: number) => {
    matrix[row] = [];

    line.split('').map((char, col) => {
        matrix[row][col] = char;
        if (symbolRegExp.test(matrix[row][col])) {
            symbolCoords.push([row, col]);
        }
    });
});

/**
 * Iterate over symbols and validate the perimeter of each symbol.
 *
 * If a number is found, build the number by checking locale digits to left and right.
 *
 * Keep track of the previous number on each row to avoid duplicates.
 */
symbolCoords.map((coord: number[]) => {
    const [row, col] = coord;
    let gearNumbers: number[] = [];

    // iterate through perimeter and construct numbers
    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
        let prevDigit = -1;
        for (let newCol = col - 1; newCol <= col + 1; newCol++) {
            if (newRow != row || newCol != col) {
                if (isNumber(matrix[newRow][newCol])) {
                    // number is found, construct the full number and store in val
                    let digitAsStr: string = matrix[newRow][newCol];

                    // build left
                    let index = 1;
                    while (
                        isWithinBounds(newRow, newCol - index) &&
                        isNumber(matrix[newRow][newCol - index])
                    ) {
                        digitAsStr = `${
                            matrix[newRow][newCol - index]
                        }${digitAsStr}`;
                        index++;
                    }

                    // build right
                    index = 1;
                    while (
                        isWithinBounds(newRow, newCol + index) &&
                        isNumber(matrix[newRow][newCol + index])
                    ) {
                        digitAsStr = `${digitAsStr}${
                            matrix[newRow][newCol + index]
                        }`;
                        index++;
                    }

                    let digit: number = Number(digitAsStr);
                    if (digit !== prevDigit) {
                        // part 2: keep track of numbers from gears
                        if (matrix[row][col] === '*') {
                            gearNumbers.push(digit);
                        }

                        // setting prev allows us to account for cases like
                        // top-left and top-right duplicate numbers
                        sum += digit;
                        prevDigit = digit;
                    }
                } else {
                    prevDigit = -1;
                }
            }
        }
    }

    // for part 2, sum the product of all gear numbers if there are exactly two
    if (matrix[row][col] === '*') {
        if (gearNumbers.length == 2) {
            gearRatioSum = gearRatioSum + gearNumbers[0] * gearNumbers[1];
        }

        // reset gearNumbers
        gearNumbers = [];
    }
});

console.log('Part 1 solution: ' + sum);
console.log('Part 2 solution: ' + gearRatioSum);
