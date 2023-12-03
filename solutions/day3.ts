import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day3input.txt', 'utf-8');

// part 1

const matrix: string[][] = [];
const symbolCoords: number[][] = [];

const symbolRegExp = new RegExp('[^0-9|.]', 'g');

const lines = data.split(/\r?\n/);

// build 2-D matrix and keep track of all symbols along the way
lines.map((line, row) => {
    matrix[row] = [];

    line.split('').map((char, col) => {
        matrix[row][col] = char;
        if (symbolRegExp.test(matrix[row][col])) {
            symbolCoords.push([row, col]);
        }
    });
});

/**
 * Checks if a location in matrix is valid provided a row and col
 */
const boundsCheck = (row: number, col: number) => {
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

const isNumber = (val: string) => {
    return !isNaN(Number(val));
};

/**
 * Print perimeter around grid from row and col
 */
const _printGrid = (row: number, col: number) => {
    let result = ``;

    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
        let resultRow = ``;

        for (let newCol = col - 1; newCol <= col + 1; newCol++) {
            resultRow = boundsCheck(newRow - 1, newCol - 1)
                ? `${resultRow} ${matrix[newRow][newCol]}`
                : resultRow;
        }

        result += `${resultRow}\n`;
    }

    console.log(result);
};

let sum = 0;
let gearRatioSum = 0;

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

    for (let newRow = row - 1; newRow <= row + 1; newRow++) {
        let prev = -1;
        for (let newCol = col - 1; newCol <= col + 1; newCol++) {
            if (newRow != row || newCol != col) {
                if (isNumber(matrix[newRow][newCol])) {
                    // number is found, construct the full number and store in val
                    let val: string = matrix[newRow][newCol];
                    let index = 1;

                    // build left
                    while (
                        boundsCheck(newRow, newCol - index) &&
                        isNumber(matrix[newRow][newCol - index])
                    ) {
                        if (
                            boundsCheck(newRow, newCol - index) &&
                            !isNaN(Number(matrix[newRow][newCol - index]))
                        ) {
                            val = `${matrix[newRow][newCol - index]}${val}`;
                        }

                        index++;
                    }

                    // build right
                    index = 1;
                    while (
                        boundsCheck(newRow, newCol + index) &&
                        isNumber(matrix[newRow][newCol + index])
                    ) {
                        if (
                            boundsCheck(newRow, newCol + index) &&
                            !isNaN(Number(matrix[newRow][newCol + index]))
                        ) {
                            val = `${val}${matrix[newRow][newCol + index]}`;
                        }

                        index++;
                    }

                    let valAsNum: number = Number(val);
                    if (valAsNum !== prev) {
                        // part 2: keep track of numbers from gears
                        if (matrix[row][col] === '*') {
                            gearNumbers.push(valAsNum);
                        }

                        // setting prev allows us to account for cases like
                        // top-left and top-right duplicate numbers
                        sum += valAsNum;
                        prev = valAsNum;
                    }
                } else {
                    prev = -1;
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
