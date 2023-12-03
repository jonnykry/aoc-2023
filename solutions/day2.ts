import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day2input.txt', 'utf-8');

// goal: how many games can be completed with 12 red, 13 green, 14 blue

const RED_COUNT = 12;
const GREEN_COUNT = 13;
const BLUE_COUNT = 14;

// Part 1

const lines = data.split(/\r?\n/);

let partOneValidGameIdSum = 0;
let partTwoMaximumPowerSum = 0;

for (let line of lines) {
    // Split on 'Game #' and the game sequence
    const parts = line.split(': ');
    const gameId = parts[0];
    const id = Number(gameId.split(' ')[1]);
    const game = parts[1];

    // Split on ';' and for each round of the game sequence
    const gameSplits = game.split('; ');
    const partTwoColorMaximums = {
        blue: 0,
        red: 0,
        green: 0,
    };

    let isValid = true;
    for (let sequence of gameSplits) {
        let colorMap = {
            red: RED_COUNT,
            blue: BLUE_COUNT,
            green: GREEN_COUNT,
        };

        // Split on each move ',' within a game sequence split
        let moves = sequence.split(', ');

        for (let move of moves) {
            let [quantity, color] = move.split(' ');
            colorMap[color] = colorMap[color] - Number(quantity);
            partTwoColorMaximums[color] = Math.max(
                partTwoColorMaximums[color],
                Number(quantity)
            );
        }

        Object.keys(colorMap).map((key) => {
            if (colorMap[key] < 0) {
                isValid = false;
            }
        });
    }

    // Multiply each color maximum together and sum for part 2
    partTwoMaximumPowerSum += Object.keys(partTwoColorMaximums).reduce(
        (acc, curr) => acc * partTwoColorMaximums[curr],
        1
    );

    if (isValid) {
        partOneValidGameIdSum += id;
    }
}

console.log(`Part one answer: ${partOneValidGameIdSum}`);

// Part 2
// In part 2, we're looking to find the maximum of each color
// to satisfy a game sequence based on what we've seen.
// We can keep track of this in-line in the Part 1 solution.

console.log(`Part one answer: ${partTwoMaximumPowerSum}`);
