import { parseFile } from './utils';

type Card = string;
type Bid = number;
type CardBidTuple = [Card, Bid];
type CardCountTuple = [Card, number];
enum Hands {
    SingleCard,
    OnePair,
    TwoPair,
    ThreeOfKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

export const solution = (data: string) => {
    const lines = data.split(/\n/);
    const rankToNumber = new Map<string, number>();
    rankToNumber.set('A', 14);
    rankToNumber.set('T', 10);
    rankToNumber.set('J', 11);
    rankToNumber.set('Q', 12);
    rankToNumber.set('K', 13);
    rankToNumber.set('2', 2);
    rankToNumber.set('3', 3);
    rankToNumber.set('4', 4);
    rankToNumber.set('5', 5);
    rankToNumber.set('6', 6);
    rankToNumber.set('7', 7);
    rankToNumber.set('8', 8);
    rankToNumber.set('9', 9);

    const hands: CardBidTuple[] = lines.map((line) => {
        const [card, bid] = line.split(' ');
        return [card, parseInt(bid)];
    });

    const getCardCounts = (card: Card): CardCountTuple[] => {
        const cardCounts = new Map<string, number>();
        card.split('').map((ch) => {
            const curr = cardCounts.get(ch);
            cardCounts.set(ch, curr ? curr + 1 : 1);
        });

        return Array.from(cardCounts.entries()).sort((a, b) => b[1] - a[1]);
    };

    const getHandFromCounts = (countSet: CardCountTuple[]): Hands => {
        const firstCount = countSet[0][1];
        if (firstCount === 5) {
            return Hands.FiveOfAKind;
        } else if (firstCount === 4) {
            return Hands.FourOfAKind;
        }

        const secondCount = countSet[1][1];
        if (firstCount === 3 && secondCount === 2) {
            return Hands.FullHouse;
        } else if (firstCount === 3) {
            return Hands.ThreeOfKind;
        } else if (firstCount === 2 && secondCount === 2) {
            return Hands.TwoPair;
        } else if (firstCount === 2) {
            return Hands.OnePair;
        }

        return Hands.SingleCard;
    };

    const compareHandEquality = (leftCard: string, rightCard: string) => {
        let i = 0;
        let leftRank = '';
        let rightRank = '';

        while (
            leftRank === rightRank &&
            i < leftCard.length &&
            i < rightCard.length
        ) {
            leftRank = leftCard.charAt(i);
            rightRank = rightCard.charAt(i);
            i++;
        }

        const leftVal = rankToNumber.get(leftRank)!;
        const rightVal = rankToNumber.get(rightRank)!;

        if (leftVal > rightVal) {
            return 1;
        } else if (leftVal < rightVal) {
            return -1;
        } else {
            return 0;
        }
    };

    const compareCardCounts = (
        leftCard: string,
        rightCard: string,
        leftCounts: CardCountTuple[],
        rightCounts: CardCountTuple[]
    ): number => {
        const leftHand = getHandFromCounts(leftCounts);
        const rightHand = getHandFromCounts(rightCounts);

        if (leftHand === rightHand)
            return compareHandEquality(leftCard, rightCard);

        return leftHand > rightHand ? 1 : -1;
    };

    hands.sort((a: CardBidTuple, b: CardBidTuple) => {
        const leftCard = a[0];
        const rightCard = b[0];

        const leftCount = getCardCounts(leftCard);
        const rightCount = getCardCounts(rightCard);

        return compareCardCounts(leftCard, rightCard, leftCount, rightCount);
    });

    return hands.reduce((sum, cardBidPair, index) => {
        const [_, bid] = cardBidPair;
        return sum + bid * (index + 1);
    }, 0);
};

const data = await parseFile('day7input.txt');
console.log(solution(data));
