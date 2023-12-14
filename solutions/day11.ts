import { parseFile } from './utils';

const GALAXY = '#';
const EMPTY_SPACE = '.';

export const solve = (data: string, partOne: boolean = true) => {
    const lines = data.split(/\n/);
    let matrix: string[][] = [];
    let galaxyLocations: Array<[x: number, y: number]> = [];

    // build matrix
    for (let i = 0; i < lines.length; i++) {
        const tokens = lines[i].split('');
        matrix[i] = [];

        for (let j = 0; j < tokens.length; j++) {
            matrix[i][j] = tokens[j];
        }
    }

    let temp: string[][] = [];
    let emptyCols: number[] = [];
    let emptyRows: number[] = [];

    // expand rows without galaxies (and collect cols to expand)
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';
        let colStr = '';

        for (let j = 0; j < matrix[i].length; j++) {
            colStr += matrix[j][i];
            rowStr += matrix[i][j];
        }

        temp.push(rowStr.split(''));

        if (!colStr.includes(GALAXY) && !emptyCols.includes(i)) {
            emptyCols.push(i);
        }

        if (!rowStr.includes(GALAXY) && !emptyRows.includes(i)) {
            emptyRows.push(i);
        }
    }

    matrix = temp;

    // discover many galaxies far far away
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === GALAXY) {
                let newX = i;
                let newY = j;

                for (let row of emptyRows) {
                    if (i > row) {
                        newX += partOne ? 1 : 999999;
                    }
                }

                for (let col of emptyCols) {
                    if (j > col) {
                        newY += partOne ? 1 : 999999;
                    }
                }

                galaxyLocations.push([newX, newY]);
            }
        }
    }

    return galaxyLocations.reduce((sum, [x, y], index) => {
        for (let j = index + 1; j < galaxyLocations.length; j++) {
            let newX = galaxyLocations[j][0];
            let newY = galaxyLocations[j][1];
            const manhattan = Math.abs(x - newX) + Math.abs(y - newY);

            sum += manhattan;
        }

        return sum;
    }, 0);
};

const data = await parseFile('day11input.txt');
const result = solve(data);
const resultTwo = solve(data, false);

console.log(result);
console.log(resultTwo);
