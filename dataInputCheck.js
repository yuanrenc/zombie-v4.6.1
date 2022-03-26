const { isObjEqual } = require('./utils/isObjEqual');

/* possible errors:
 *1.It's not a positive int.
 *2,undefined;
 */
function gridGenerateCheck(dimensions) {
  if (dimensions === undefined) {
    // console.error('Dimensions data missed.');
    throw new Error('Dimensions data missed.');
  } else if (parseInt(dimensions) !== dimensions || dimensions <= 1) {
    // console.error(`Please check dimensions' data format!`);
    throw new Error(`Please check dimensions' data format!`);
  }
}

/* possible errors:
 *1.More than D,L,R,U;
 *2,undefined;
 */
function movesInputCheck(moves) {
  let reg = /^[DLUR]+$/;
  if (moves === undefined) {
    // console.error(`Moves data missed.`);
    throw new Error(`Moves data missed.`);
  } else if (!reg.test(moves)) {
    // console.error(`Please check moves' data format!`);
    throw new Error(`Please check moves' data format!`);
  }
}

/* possible errors:
 *1.Initial position overed the boundary.
 *2,undefined;
 *3,data format incorrect.
 */
function zombieInputCheck(zombie, dimensions) {
  if (zombie === null || typeof zombie !== 'object' || zombie === undefined) {
    throw new Error(`Please check zombie's data format!`);
  } else if (
    zombie['x'] === 'undefined' ||
    parseInt(zombie['x']) !== zombie['x'] ||
    zombie['x'] <= 0
  ) {
    throw new Error(`Please check zombie["x"]'s data format!`);
  } else if (
    zombie['y'] === 'undefined' ||
    parseInt(zombie['y']) !== zombie['y'] ||
    zombie['y'] <= 0
  ) {
    throw new Error(`Please check zombie["y"]'s data format!`);
  } else if (zombie['y'] > dimensions - 1 || zombie['x'] > dimensions - 1) {
    throw new Error(
      "Zombie can't be generated. Please re-set the initial position of the zombie, numbers should be less than the dimensions of the grid."
    );
  }
}

/* possible errors:
 *1.Too many creatures;
 *2,Duplicated data entered.
 *3,Incorrect data format.
 *4,No creatures;
 *5,Out of boundary.
 *6,Same position with the zombie.
 */
function creaturesInputCheck(creatures, zombie, dimensions) {
  if (!Array.isArray(creatures)) {
    throw new Error(
      `Please check creatures' data format, it should be an Array.`
    );
  } else if (creatures.length === 0) {
    throw new Error('Please put some creatures in. ');
  } else {
    for (let index = 0; index < creatures.length; index++) {
      const creature = creatures[index];
      if (
        creature === null ||
        typeof creature !== 'object' ||
        creature === undefined
      ) {
        throw new Error(`Please check creature's data format!`);
      } else if (
        creature['x'] === undefined ||
        parseInt(creature['x']) !== creature['x'] ||
        creature['x'] < 0
      ) {
        throw new Error(`Please check creature's data format!`);
      } else if (
        creature['y'] === 'undefined' ||
        parseInt(creature['y']) !== creature['y'] ||
        creature['y'] < 0
      ) {
        throw new Error(`Please check creature's data format!`);
      } else if (
        creature['y'] > dimensions - 1 ||
        creature['x'] > dimensions - 1
      ) {
        throw new Error(
          `A few creatures can't be generated.Please re-set the initial position, numbers should be less than the dimensions of the grid.`
        );
      }
    }
    duplicatedCreaturesDeleted(creatures);
    if (creatures.length >= dimensions * dimensions) {
      throw new Error(
        'There are too many creatures, please take a few creatures away.'
      );
    }
    for (let index = 0; index < creatures.length; index++) {
      const creature = creatures[index];
      if (isObjEqual(zombie, creature)) {
        throw new Error(
          `Creatures should not be at the same position with zombie, please check data. `
        );
      }
    }
  }
}

function duplicatedCreaturesDeleted(creatures) {
  for (let i = 0; i < creatures.length - 1; i++) {
    let creature1 = creatures[i];
    for (let j = i + 1; j < creatures.length; j++) {
      let creature2 = creatures[j];
      if (isObjEqual(creature1, creature2)) {
        creatures.splice(j, 1);
        j--;
      }
    }
  }
  return creatures;
}

module.exports = {
  duplicatedCreaturesDeleted,
  creaturesInputCheck,
  zombieInputCheck,
  gridGenerateCheck,
  movesInputCheck
};
