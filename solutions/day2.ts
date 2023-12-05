import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day2input.txt', 'utf-8');

// goal: how many games can be completed with 12 red, 13 green, 14 blue

const RED_COUNT = 12;
const GREEN_COUNT = 13;
const BLUE_COUNT = 14;
const COLORS = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
};
const INITIAL_COLOR_MAP = {
    [COLORS.RED]: RED_COUNT,
    [COLORS.BLUE]: BLUE_COUNT,
    [COLORS.GREEN]: GREEN_COUNT,
};

// Initialize colormap
let colorMap = INITIAL_COLOR_MAP;

// Part 1

let validGameIdSum = 0;
let productSum = 0;

const lines = data.split(/\r?\n/);
for (let line of lines) {
    colorMap = INITIAL_COLOR_MAP;

    // Split on 'Game #' and the game sequence
    const parts = line.split(': ');
    const gameId = parts[0];
    const id = Number(gameId.split(' ')[1]);
    const game = parts[1];

    // Split on ';' and for each round of the game sequence
    const splitGame = game.split('; ');
    const colorMaximums: { [key: string]: number } = {
        blue: 0,
        red: 0,
        green: 0,
    };

    let isValid = true;
    for (let sequence of splitGame) {
        // Split on each move ',' within a game sequence split
        let moves = sequence.split(', ');
        const tempColorMap = { ...colorMap };

        for (let move of moves) {
            const [quantityStr, color] = move.split(' ');
            const quantity = Number(quantityStr);

            tempColorMap[color] -= quantity;
            colorMaximums[color] = Math.max(colorMaximums[color], quantity);

            if (tempColorMap[color] < 0) {
                isValid = false;
            }
        }
    }

    // Multiply each color maximum together and sum for part 2
    productSum += Object.keys(colorMaximums).reduce(
        (product, color) => product * colorMaximums[color],
        1
    );

    if (isValid) {
        validGameIdSum += id;
    }
}

console.log(`Part one answer: ${validGameIdSum}`);

// Part 2
// In part 2, we're looking to find the maximum of each color
// to satisfy a game sequence based on what we've seen.
// We can keep track of this in-line in the Part 1 solution.

console.log(`Part one answer: ${productSum}`);
