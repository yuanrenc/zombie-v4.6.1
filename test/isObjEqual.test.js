const { expect } = require('@jest/globals');
const { isObjEqual } = require('../utils/isObjEqual');

describe('isObJEqual compares two objects', () => {
  test(`if two objects are equal,return true`, () => {
    let obj1 = { x: 1, y: 1 };
    let obj2 = { x: 1, y: 1 };
    expect(isObjEqual(obj1, obj2)).toBe(true);
  });
  test(`if two objects aren't equal,return false`, () => {
    let obj1 = { x: 1, y: 2 };
    let obj2 = { x: 1, y: 1 };
    expect(isObjEqual(obj1, obj2)).toBe(false);
  });
});
