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

// skipping file parsing since it's straightforward
const partOne = solution([47, 84, 74, 67], [207, 1394, 1209, 1014]);
const partTwo = solution([47847467], [207139412091014]);

console.log('Part One solution: ', partOne);
console.log('Part Two solution: ', partTwo);
