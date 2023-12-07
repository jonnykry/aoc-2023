import { parseFile } from './utils';

const solution = (time: number[], distance: number[]): number => {
    let counts = [0, 0, 0, 0];

    for (let i = 0; i < time.length; i++) {
        for (let speed = 0; speed < time[i]; speed++) {
            const d = speed * (time[i] - speed);
            if (d > distance[i]) counts[i] += 1;
        }
    }

    return counts.reduce(
        (product, curr) => (curr > 0 ? product * curr : product),
        1
    );
};

const data = await parseFile('day6input.txt');
const lines = data.split(/\n/);
const times = lines[0]
    .split('Time: ')[1]
    .split(' ')
    .map((str) => Number(str));
const distances = lines[1]
    .split('Distance: ')[1]
    .split(' ')
    .map((str) => Number(str));

const partOne = solution(times, distances);

const p2Time = Number(times.map((time) => `${time}`).join(''));
const p2Dist = Number(distances.map((dist) => `${dist}`).join(''));
const partTwo = solution([p2Time], [p2Dist]);

console.log('Part One solution:', partOne);
console.log('Part Two solution:', partTwo);
