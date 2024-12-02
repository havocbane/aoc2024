import * as fs from "fs";

function part1(): number {
    let sum = 0;
    const puzzleInput = fs.readFileSync('1.txt').toString().split('\n');
    const left = puzzleInput.map(line => Number(line.split(" ")[0]));
    const right = puzzleInput.map(line => Number(line.split(" ").slice(-1)[0]));
    while (left.length > 0) {
        const smallestLeft = Math.min(...left);
        const smallestRight = Math.min(...right);
        const distance = Math.abs(smallestLeft - smallestRight);
        // console.log(`Left: ${smallestLeft}, Right: ${smallestRight}, Distance: ${distance}`);
        sum += distance;
        left.splice(left.indexOf(smallestLeft), 1);
        right.splice(right.indexOf(smallestRight), 1);
    }
    return sum;
}

console.log(`Part 1: ${part1()}`);
