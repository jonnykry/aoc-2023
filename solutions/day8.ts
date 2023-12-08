import { parseFile } from './utils';

type Children = [string, string];

const createNodeMap = (lines: string[]) => {
    const nodeMap = new Map<string, Children>();

    lines.map((line) => {
        const [node, childStr] = line.split(' = ');
        const [leftStr, rightStr] = childStr.split(', ');
        const left = leftStr.substring(1);
        const right = rightStr.substring(0, rightStr.length - 1);

        nodeMap.set(node, [left, right]);
    });

    return nodeMap;
};

const getStartingNodes = (nodes: string[]) => {
    return nodes.filter((node) => node.charAt(node.length - 1) === 'A');
};

export const partOne = (lines: string[]) => {
    const instructionQueue = lines[0].split('');
    lines = lines.slice(2);
    const nodeMap = createNodeMap(lines);

    let curr = 'AAA';
    let steps = 0;
    let queue = [...instructionQueue];

    while (curr !== 'ZZZ') {
        const [left, right] = nodeMap.get(curr)!;
        let instruction = queue.shift()!;

        curr = instruction === 'R' ? right : left;
        queue.push(instruction);

        steps++;
    }

    console.log('Part One solution: ', steps);
};

export const partTwo = (lines: string[]) => {
    const instructions = lines[0].split('');
    lines = lines.slice(2);
    const nodeMap = createNodeMap(lines);
    const startingNodes = getStartingNodes(Array.from(nodeMap.keys()));
    const startingSteps = [];

    for (let node of startingNodes) {
        let steps = 0;
        let curr = node;

        while (curr[2] !== 'Z') {
            for (let inst of instructions) {
                steps++;

                if (inst === 'R') {
                    curr = nodeMap.get(curr)![1];
                } else {
                    curr = nodeMap.get(curr)![0];
                }

                if (curr[2] === 'Z') break;
            }
        }

        startingSteps.push(steps);
    }

    console.log('Part Two solution: lcm(', startingSteps, ')');
};

const data = await parseFile('day8input.txt');
let lines = data.split(/\n/);

partOne(lines);

partTwo(lines);
