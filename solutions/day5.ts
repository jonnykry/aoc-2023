import { parseFileLines } from './utils';

const fetchInput = async () => {
    return await parseFileLines('day5input.txt');
};

const lines = await fetchInput();

console.log(lines);
