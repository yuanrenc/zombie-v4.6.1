const { expect } = require('@jest/globals');
const { move } = require('../zombieMoves');

describe('move function', () => {
  test(`Zombie could across the boundary`, () => {
    let N1 = 'R';
    let zombie1 = { x: 1, y: 1 };
    let dimensions1 = 2;
    expect(move(N1, zombie1, dimensions1)).toEqual({ x: 0, y: 1 });
    let N2 = 'L';
    let zombie2 = { x: 0, y: 1 };
    let dimensions2 = 2;
    expect(move(N2, zombie2, dimensions2)).toEqual({ x: 1, y: 1 });
    let N3 = 'U';
    let zombie3 = { x: 0, y: 0 };
    let dimensions3 = 2;
    expect(move(N3, zombie3, dimensions3)).toEqual({ x: 0, y: 1 });
    let N4 = 'D';
    let zombie4 = { x: 0, y: 1 };
    let dimensions4 = 2;
    expect(move(N4, zombie4, dimensions4)).toEqual({ x: 0, y: 0 });
  });
});
