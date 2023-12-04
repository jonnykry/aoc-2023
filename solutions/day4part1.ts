import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day4input.txt', 'utf-8');
const lines = data.split(/\r?\n/);

let total = 0;

lines.map((line) => {
    const [leftSide, rightSide] = line
        .replace(/ +/g, ' ')
        .split('|')
        .map((st) => st.trim());
    const [_, winningNumsAsStr] = leftSide.split(':').map((st) => st.trim());
    const revealed = rightSide.split(' ').map((num) => Number(num));
    const winning = winningNumsAsStr.split(' ').map((num) => Number(num));

    let lineTotal = 0;
    revealed.map((num) => {
        if (num && winning.includes(num)) {
            if (lineTotal === 0) {
                lineTotal = 1;
            } else {
                lineTotal += lineTotal;
            }
        }
    });

    total += lineTotal;
});

console.log(total);
