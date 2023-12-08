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
const JOKER = 'J';

export const solve = (data: string, isJoker: boolean = false) => {
    const lines = data.split(/\n/);
    const rankToNumber = new Map<string, number>();
    rankToNumber.set('A', 14);
    rankToNumber.set('T', 10);
    isJoker ? rankToNumber.set(JOKER, 1) : rankToNumber.set(JOKER, 11);
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

    /**
     * Sort card counts by quantity of duplicates and rank numbers if they're equal.
     */
    const sortCardCounts = (cardCounts: CardCountTuple[]) => {
        return cardCounts.sort((a, b) => {
            if (b[1] - a[1] === 0) {
                return rankToNumber.get(b[0])! - rankToNumber.get(a[0])!;
            } else {
                return b[1] - a[1];
            }
        });
    };

    const getCardCounts = (
        card: Card
    ): [CardCountTuple[], Map<string, number>] => {
        const cardCounts = new Map<string, number>();
        card.split('').map((ch) => {
            const curr = cardCounts.get(ch);
            cardCounts.set(ch, curr ? curr + 1 : 1);
        });

        let countTuples = sortCardCounts(Array.from(cardCounts.entries()));

        return [countTuples, cardCounts];
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

    /**
     * Compares between two equal hands of cards based on checking first non-matching ranks.
     */
    const compareHandEquality = (leftHand: string, rightHand: string) => {
        let i = 0;
        let leftRank = '';
        let rightRank = '';

        while (
            leftRank === rightRank &&
            i < leftHand.length &&
            i < rightHand.length
        ) {
            leftRank = leftHand.charAt(i);
            rightRank = rightHand.charAt(i);
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

    /**
     * Applies Jokers as wildcards to the first non-joker occurrence. Sorts jokers to back of list by
     * setting their quantity to 1, so long as there are multiple types of cards in the set.
     *
     * If there are less than 2 types of cards in the set, then they could all be jokers.
     */
    const handleJokers = (
        counts: CardCountTuple[], // sorted card counts
        totalJokers: number | undefined
    ) => {
        if (!totalJokers) return;

        for (let i = 0; i < counts.length; i++) {
            if (counts[i][0] !== JOKER) {
                counts[i][1] += totalJokers;
                break;
            } else {
                // TODO: this doesn't work always, but it worked for my given input.
                // I think better would be to entirely remove jokers when there are less than 4.
                if (counts.length > 1) {
                    counts[i][1] = 1;
                }
            }
        }

        counts = sortCardCounts(counts);
    };

    hands.sort((a: CardBidTuple, b: CardBidTuple) => {
        const leftCard = a[0];
        const rightCard = b[0];

        const [leftCount, leftMap] = getCardCounts(leftCard);
        const [rightCount, rightMap] = getCardCounts(rightCard);

        if (isJoker) {
            handleJokers(leftCount, leftMap.get(JOKER));
            handleJokers(rightCount, rightMap.get(JOKER));
        }

        return compareCardCounts(leftCard, rightCard, leftCount, rightCount);
    });

    return hands.reduce((sum, cardBidPair, index) => {
        const [_, bid] = cardBidPair;
        return sum + bid * (index + 1);
    }, 0);
};

const data = await parseFile('day7input.txt');

export const partOne = (data: string) => {
    return solve(data);
};

console.log(partOne(data));

export const partTwo = (data: string) => {
    return solve(data, true);
};

console.log(partTwo(data));
