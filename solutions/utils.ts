import { promises as fs } from 'fs';
import path from 'path';

export async function parseFile(filename: string) {
    const data = await fs.readFile(
        path.join(process.cwd(), 'inputs', filename),
        'utf-8'
    );

    return data;
}

export const printMatrix = (matrix: any[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        let str = '';
        for (let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j];
        }

        console.log(str);
    }
};
