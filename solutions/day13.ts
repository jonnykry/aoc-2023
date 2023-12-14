import { parseFile, printMatrix } from './utils';

const checkMirror = (matrix: string[][], i: number): boolean => {
    // sliding window check on mirror
    // count rows or cols previous to possible mirror
    let l = i - 2;
    let r = i + 1;
    let isValid = true;

    while (l >= 0 && r < matrix.length) {
        let lRow = '';
        let rRow = '';

        for (let k = 0; k < matrix[i].length; k++) {
            lRow += matrix[l][k];
            rRow += matrix[r][k];
        }

        if (lRow !== rRow) {
            return false;
        }

        l--;
        r++;
    }

    if (isValid) {
        return true;
    }

    return false;
};

const transposeMatrix = (matrix: string[][]) => {
    let result = [];

    for (let i = 0; i < matrix[0].length; i++) {
        let col = '';

        for (let j = 0; j < matrix.length; j++) {
            col += matrix[j][i];
        }

        result.push(col.split(''));
    }

    return result;
};

const addMirrors = (
    matrix: string[][],
    sum: number,
    summarize: (index: number) => number
) => {
    let prev = '';

    for (let i = 0; i < matrix.length; i++) {
        let row = '';
        for (let j = 0; j < matrix[i].length; j++) {
            row += matrix[i][j];
        }

        if (prev === row && checkMirror(matrix, i)) {
            sum += summarize(i);
        }

        prev = row;
    }

    return sum;
};

export const solve = (data: string, isPartOne: boolean = true) => {
    const lines = data.split(/\n/);
    let matrices: string[][][] = [];
    let tempMatrix: string[][] = [];

    for (let line of lines) {
        if (line.trim().length > 0) {
            tempMatrix.push(line.split(''));
        } else {
            matrices.push(tempMatrix);
            tempMatrix = [];
        }
    }

    if (tempMatrix) {
        matrices.push(tempMatrix);
        tempMatrix = [];
    }

    return matrices.reduce((sum: number, matrix: string[][]) => {
        sum = addMirrors(matrix, sum, (index: number) => 100 * index);
        matrix = transposeMatrix(matrix);
        sum = addMirrors(matrix, sum, (index: number) => index);

        return sum;
    }, 0);
};

const data = await parseFile('day13input.txt');

const result = solve(data);

console.log(result);
