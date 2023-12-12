import { parseFile } from './utils';

const GALAXY = '#';
const EMPTY_SPACE = '.';

const printMatrix = (matrix: any[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        let str = '';
        for (let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j];
        }

        console.log(str);
    }
};

export const partOne = (data: string) => {
    const lines = data.split(/\n/);
    let matrix: string[][] = [];
    let galaxyLocations: number[][] = [];

    // build matrix
    for (let i = 0; i < lines.length; i++) {
        const tokens = lines[i].split('');
        matrix[i] = [];

        for (let j = 0; j < tokens.length; j++) {
            matrix[i][j] = tokens[j];
        }
    }

    let temp: string[][] = [];
    let colsToExpand = [];

    // expand rows without galaxies (and collect cols to expand)
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';
        let colStr = '';

        for (let j = 0; j < matrix[i].length; j++) {
            colStr += matrix[j][i];
            rowStr += matrix[i][j];
        }

        temp.push(rowStr.split(''));

        if (!colStr.includes(GALAXY)) {
            colsToExpand.push(i);
        }

        if (!rowStr.includes(GALAXY)) {
            temp.push(rowStr.split(''));
        }
    }

    matrix = temp;

    temp = [];
    // expand columns without galaxies
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';

        for (let j = 0; j < matrix[i].length; j++) {
            rowStr += matrix[i][j];

            if (colsToExpand.includes(j)) {
                rowStr += EMPTY_SPACE;
            }
        }

        temp.push(rowStr.split(''));
    }

    matrix = temp;

    // discover many galaxies far far away
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === GALAXY) {
                galaxyLocations.push([i, j]);
            }
        }
    }

    // sum the manhattan distance of every galaxy in the list
    return galaxyLocations.reduce((sum, [x, y], index) => {
        for (let j = index + 1; j < galaxyLocations.length; j++) {
            const manhattan =
                Math.abs(x - galaxyLocations[j][0]) +
                Math.abs(y - galaxyLocations[j][1]);

            sum += manhattan;
        }

        return sum;
    }, 0);
};

const data = await parseFile('day11input.txt');
const result = partOne(data);
console.log(result);
