const { expect } = require('@jest/globals');
const { zombieMove, zombieGroupMove } = require('../main');

jest.mock('../main.js');

describe(`Single Zombie move`, () => {
  test(`could return new Zombies list`, () => {
    let zombie = { x: 2, y: 1, id: 0 };
    let newId = 1;
    expect(zombieMove(zombie, newId)).toEqual([
      { id: 2, x: 1, y: 2 },
      { id: 1, x: 2, y: 2 }
    ]);
  });
});

describe(`Single Zombie move`, () => {
  test(`could return new Zombies list`, () => {
    let zombie = { x: 2, y: 1, id: 0 };
    let newId = 1;
    expect(zombieMove(zombie, newId)).toEqual([
      { id: 2, x: 1, y: 2 },
      { id: 1, x: 2, y: 2 }
    ]);
  });
});
