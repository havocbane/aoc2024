/*
for each character
if it's an 'x'
check each direction (up, down, left, right, diagonal up-left, diagonal up-right, diagonal down-left, diagonal down-right) in a straight line up to max(boundary, 4 characters away)
if it spells "xmas", add one to the count
This feels like depth first search
*/

/*
for each direction
create a string of the characters in that direction
count the number of occurrences of "xmas"
add them up
*/

import * as fs from 'fs';

function countXmas(direction: string): number {
    return direction.match(/XMAS/g)?.length || 0;
}

function buildDown(grid: string[][]): string {
    let result = "";
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            result += grid[j][i];
        }
    }
    return result;
}

function buildUp(grid: string[][]): string {
    return buildDown(grid).split('').reverse().join('');
}

// M M M S X X M A S M
// M S A M X M S M S A
// A M X S X M A A M M
// M S A M A S M S M X
// X M A S A M X A M M
// X X A M M X X A M A
// S M S M S A S X S S
// S A X A M A S A A A
// M A M M M X M M M M
// M X M X A X M A S X

function buildLeft(grid: string[][]): string {
    let result = "";
    for (let x = 0; x < grid.length; x++) {
        for (let y = grid.length - 1; y >= 0; y--) {
            result += grid[x][y];
        }
    }
    return result;
}

function buildRight(grid: string[][]): string {
    return buildLeft(grid).split('').reverse().join('');
}

function buildDiagonalDownLeft(grid: string[][]): string {
    let result = "";
    for (let i = 0; i < grid.length; i++) {
        let y = i;
        let x = 0;
        while (y >= 0 && x <= i) {
            result += grid[x][y];
            x++;
            y--;
        }
    }
    for (let i = 1; i < grid.length; i++) {
        let y = grid.length - 1;
        let x = i;
        while (y >= i && x < grid.length) {
            result += grid[x][y];
            x++;
            y--;
        }
    }
    return result;
}

function buildDiagonalDownRight(grid: string[][]): string {
    let result = "";
    for (let i = 0; i < grid.length; i++) {
        let y = grid.length - 1 - i;
        let x = 0;
        while (y < grid.length && x <= i) {
            result += grid[x][y];
            x++;
            y++;
        }
    }
    for (let i = 1; i < grid.length; i++) {
        let y = 0;
        let x = i;
        while (y <= grid.length - 1 - i && x < grid.length) {
            result += grid[x][y];
            x++;
            y++;
        }
    }
    return result;
}

function buildDiagonalUpLeft(grid: string[][]): string {
    return buildDiagonalDownRight(grid).split('').reverse().join('');
}

function buildDiagonalUpRight(grid: string[][]): string {
    return buildDiagonalDownLeft(grid).split('').reverse().join('');
}

function part1() {
    const puzzleInput = fs.readFileSync('4.txt').toString();
    const grid = puzzleInput.split('\n').map(row => row.split(''));

    const checkLeft = 'MSAMXXSMMMASMSMXMASMMMAAMXSXMAXMSMSAMASMMMAXMASAMXAMAXXMMAXXSSXSASMSMSAAASAMAXASMMMMXMMMAMXSAMXAXMXM';
    const resultLeft = buildLeft(grid);

    const checkRight = 'MXMXAXMASXMAMMMXMMMMSAXAMASAAASMSMSASXSSXXAMMXXAMAXMASAMXAMMMSAMASMSMXAMXSXMAAMMMSAMXMSMSAMMMSXXMASM';
    const resultRight = buildRight(grid);

    const checkDown = 'MMAMXXSSMMMSMSMXMAAXMAXAAASXMMSMSMSMMAMXXXXAAMSMMAXMMSMXAAXXMSAMXXSSMMAMASAAXAMASSMMMMSAMSMAMXMASAMX';
    const resultDown = buildDown(grid);

    const checkUp = 'XMASAMXMAMSMASMMMMSSAMAXAASAMAMMSSXXMASMXXAAXMSMMXAMMSMAAXXXXMAMMSMSMSMMXSAAAXAMXAAMXMSMSMMMSSXXMAMM';
    const resultUp = buildUp(grid);

    const checkDiagonalDownLeft = 'MMMMSASAMMXMXSXXXSAMXMMXMAXSASMASAMSSMASAMSAMMSAMMMMXAMAMSXXSAMXMMAXAMMMXMASAMXMMXSXAASAMXSAMMAMAMSX';
    const resultDiagonalDownLeft = buildDiagonalDownLeft(grid);

    const checkDiagonalDownRight = 'MSAASMMMMXXSAMMXMASMASXMMAMSMMXSXASAMASAMXXAMMSXMAXSAMXMMASMASMSASAMSAMAMMAMMXMXXSAMXXMXMASAMXSAMMXM';
    const resultDiagonalDownRight = buildDiagonalDownRight(grid);

    const checkDiagonalUpLeft = 'MXMMASXMASAMXMXXMASXXMXMMAMMAMASMASASMSAMSAMMXMASXAMXSMMAXXMASAMASAXSXMMSMAMMXSAMSAMXMMASXXMMMMSAASM';
    const resultDiagonalUpLeft = buildDiagonalUpLeft(grid);

    const checkDiagonalUpRight = 'XSMAMAMMASXMASAAXSXMMXMASAMXMMMAXAMMXMASXXSMAMAXMMMMASMMASMASAMSSMASAMSASXAMXMMXMASXXXSXMXMMASASMMMM';
    const resultDiagonalUpRight = buildDiagonalUpRight(grid);

    if (checkLeft === resultLeft &&
        checkRight === resultRight &&
        checkDown === resultDown &&
        checkUp === resultUp &&
        checkDiagonalDownLeft === resultDiagonalDownLeft &&
        checkDiagonalDownRight === resultDiagonalDownRight &&
        checkDiagonalUpLeft === resultDiagonalUpLeft &&
        checkDiagonalUpRight === resultDiagonalUpRight) {
        console.log('All checks passed');
    }
    // This is off because I ignored the boundaries... I need to prune out items of length less than 4 on the diagonals and greater than grid length on the cardinal directions
    return countXmas(resultLeft) + countXmas(resultRight) + countXmas(resultDown) + countXmas(resultUp) + countXmas(resultDiagonalDownLeft) + countXmas(resultDiagonalDownRight) + countXmas(resultDiagonalUpLeft) + countXmas(resultDiagonalUpRight);
}

console.log(`Part 1: ${part1()}`);
