import * as fs from 'fs';

function part1() {
    const puzzleInput = fs.readFileSync('3.txt').toString();
    const instructionsRegex = /mul\((\d+,\d+)\)/g;
    const instructionsArray = [...puzzleInput.matchAll(instructionsRegex)];
    return instructionsArray.reduce((previousValue, currentValue, _currentIndex, _array) => {
        const instruction = currentValue;
        const match = (instruction[1] as unknown as string);
        const [a, b] = match.split(',').map(Number);
        return previousValue + a * b;
    }, 0);
}

console.log(`Part 1: ${part1()}`);
