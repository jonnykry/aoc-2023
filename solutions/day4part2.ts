import { readFileSync } from 'fs';

const data = readFileSync('./inputs/day4input.txt', 'utf-8');
const lines = data.split(/\r?\n/);

type Card = {
    id: number;
    revealed: number[];
    winning: number[];
};

const cards: Card[] = lines.map((line) => {
    const [leftSide, rightSide] = line
        .replace(/ +/g, ' ')
        .split('|')
        .map((st) => st.trim());
    const [cardString, winningNumsAsStr] = leftSide
        .split(':')
        .map((st) => st.trim());
    const cardNum = cardString.replace(/[^0-9]/g, '');
    const revealed = rightSide.split(' ').map((num) => Number(num));
    const winning = winningNumsAsStr.split(' ').map((num) => Number(num));

    const card = {
        id: Number(cardNum),
        revealed: revealed,
        winning: winning,
    };

    return card;
});

const scratchcards = new Map<number, number>();
for (let i = 1; i <= cards.length; i++) {
    scratchcards.set(i, 1);
}

for (let i = 1; i <= cards.length; i++) {
    const card = cards[i - 1];

    const winning = card.revealed.filter((c) =>
        card.winning.includes(c)
    ).length;

    const existing = scratchcards.get(i)!;

    for (let j = i + 1; j <= winning + i; j++) {
        scratchcards.set(j, scratchcards.get(j)! + existing);
    }
}

const total = Array.from(scratchcards.values()).reduce((sum, curr, idx) => {
    return sum + curr;
}, 0);

console.log(total);
