const { expect } = require('@jest/globals');
const {
  duplicatedCreaturesDeleted,
  creaturesInputCheck,
  zombieInputCheck,
  gridGenerateCheck,
  movesInputCheck
} = require('../dataInputCheck');

describe(`gridGenerateCheck function`, () => {
  test(`If dimensions' data format isn't right, it should throw an error`, () => {
    let mockData = 'b';
    expect(() => gridGenerateCheck(mockData)).toThrow(
      `Please check dimensions' data format!`
    );
  });
  test(`If dimensions does not existed, it should throw an error`, () => {
    expect(gridGenerateCheck).toThrow(`Dimensions data missed.`);
  });
});

describe(`movesInputCheck function`, () => {
  test(`If input Data format isn't correct, it should throw an error`, () => {
    let mockData = 'DLRZ';
    expect(() => movesInputCheck(mockData)).toThrow(
      `Please check moves' data format!`
    );
  });
  test(`If moves does not existed, it should throw an error`, () => {
    expect(movesInputCheck).toThrow(`Moves data missed.`);
  });
});

describe(`zombieInputCheck function`, () => {
  test(`If input Data isn't an object, it should throw an error`, () => {
    let mockData = 'DLRZ';
    expect(() => zombieInputCheck(mockData)).toThrow(
      `Please check zombie's data format!`
    );
  });
  test(`If zombie["x"] does not match the format, it should throw an error`, () => {
    let mockData = { y: 1 };
    let dimensions = 3;
    expect(() => zombieInputCheck(mockData, dimensions)).toThrow(
      `Please check zombie["x"]'s data format!`
    );
  });
  test(`If  zombie["y"] does not existed, it should throw an error`, () => {
    let mockData = { x: 1 };
    let dimensions = 3;
    expect(() => zombieInputCheck(mockData, dimensions)).toThrow(
      `Please check zombie["y"]'s data format!`
    );
  });
  test('If the data is bigger than the gird', () => {
    let mockData = { x: 4, y: 1 };
    let dimensions = 3;
    expect(() => zombieInputCheck(mockData, dimensions)).toThrow(
      "Zombie can't be generated. Please re-set the initial position of the zombie, numbers should be less than the dimensions of the grid."
    );
  });
});

describe('duplicatedCreaturesDeleted', () => {
  test('should delete duplicated data', () => {
    let mockData = [
      { x: 1, y: 2 },
      { x: 1, y: 2 }
    ];
    expect(duplicatedCreaturesDeleted(mockData)).toEqual([{ x: 1, y: 2 }]);
  });
});

describe(`creaturesInputCheck function`, () => {
  test(`If input Data isn't an array, it should throw an error`, () => {
    let mockData = 'DLRZ';
    let zombie = { x: 1, y: 1 };
    let dimensions = 4;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      `Please check creatures' data format, it should be an Array.`
    );
  });
  test(`Creatures list is empty`, () => {
    let mockData = [];
    let zombie = { x: 1, y: 1 };
    let dimensions = 4;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      'Please put some creatures in. '
    );
  });
  test(`If  some creature's data format isn't correct`, () => {
    let mockData = [{ x: 1 }];
    let zombie = { x: 1, y: 1 };
    let dimensions = 4;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      `Please check creature's data format!`
    );
  });
  test(`If the input data is bigger than gird's dimensions`, () => {
    let mockData = [{ x: 4, y: 1 }];
    let zombie = { x: 1, y: 1 };
    let dimensions = 2;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      `A few creatures can't be generated.Please re-set the initial position, numbers should be less than the dimensions of the grid.`
    );
  });
  test('There are too many creatures,', () => {
    let mockData = [
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ];
    let zombie = { x: 1, y: 1 };
    let dimensions = 2;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      'There are too many creatures, please take a few creatures away.'
    );
  });
  test(`Creature's position has been taken by a zombie,`, () => {
    let mockData = [{ x: 1, y: 1 }];
    let zombie = { x: 1, y: 1 };
    let dimensions = 4;
    expect(() => creaturesInputCheck(mockData, zombie, dimensions)).toThrow(
      `Creatures should not be at the same position with zombie, please check data. `
    );
  });
});
