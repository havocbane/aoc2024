import * as fs from 'fs';

function isSafeReport(levels: number[]): boolean {
    const increasingOrDecreasing: boolean = (levels[1] - levels[0]) > 0;
    for (let i = 0; i < levels.length - 1; i++) {
        let difference = levels[i + 1] - levels[i];
        if ((difference > 0) !== increasingOrDecreasing) {
            return false;
        }
        difference = Math.abs(difference);
        if (difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
}

function part1() {
    const puzzleInput = fs.readFileSync('2.txt').toString().split('\n');
    let safeLevelCount = 0;
    for (let report = 0; report < puzzleInput.length; report++) {
        const levels = puzzleInput[report].split(' ').map(Number);
        if (isSafeReport(levels)) {
            safeLevelCount++;
        }
    }
    return safeLevelCount;
}

console.log(`Part 1: ${part1()}`);
