const zombieMoves = require('../zombieMoves');
const { isObjEqual } = require('../utils/isObjEqual');
dataList = {
  dimensions: 4,
  zombie: {
    x: 2,
    y: 1
  },
  creatures: [
    {
      x: 3,
      y: 1
    },
    {
      x: 1,
      y: 2
    },
    {
      x: 2,
      y: 2
    }
  ],
  moves: 'DLUURDDDRRLL'
};

var dimensions = dataList['dimensions'];
var moves = dataList['moves'];
var zombiesList = [{ ...dataList['zombie'], id: 0 }];
var creaturesList = dataList['creatures'];

function zombieMove(zombie, newId) {
  let newZombiesList = [];
  let { id } = zombie;
  for (let index = 0; index < moves.length; index++) {
    let N = moves[index];
    let { x, y } = zombieMoves.move(N, zombie, dimensions);
    console.log(`zombie ${id} moved to (${x},${y}).`);
    // to see if there is a creature has been infected.
    for (let j = 0; j < creaturesList.length; j++) {
      const creature = creaturesList[j];
      if (isObjEqual(creature, { x, y })) {
        console.log(`Zombie ${id} infect creature at (${x},${y})`);
        creaturesList.splice(j, 1);
        j--;
        newZombiesList.unshift({ ...creature, id: newId });
        newId++;
      }
    }
  }
  return newZombiesList;
}
module.exports = { dimensions, moves, zombiesList, creaturesList, zombieMove };
