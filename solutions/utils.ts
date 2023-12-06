import { promises as fs } from 'fs';
import path from 'path';

export async function parseFile(filename: string) {
    const data = await fs.readFile(
        path.join(process.cwd(), 'inputs', filename),
        'utf-8'
    );

    return data;
}
