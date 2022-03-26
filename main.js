const fs = require('fs');
const {
  creaturesInputCheck,
  zombieInputCheck,
  gridGenerateCheck,
  movesInputCheck
} = require('./dataInputCheck');
const zombieMoves = require('./zombieMoves');
const { isObjEqual } = require('./utils/isObjEqual');

//get data from json file;
var dataList;
const data = fs.readFileSync('./data/demo.json', 'ascii', (err, data) => {
  if (err) {
    throw err;
  }
  return data;
});

dataList = JSON.parse(data.toString());
// console.log(dataList);

// 1.data process:check,clean and input;
gridGenerateCheck(dataList['dimensions']);
var dimensions = dataList['dimensions'];
console.log(
  `A ${dimensions}*${dimensions} grid has been generated. The top left corner of the world is (x: 0, y: 0). `
);
movesInputCheck(dataList['moves']);
var moves = dataList['moves'];
zombieInputCheck(dataList['zombie'], dimensions);
//giving zombie an id, to identify the first newly zombie.
var zombiesList = [{ ...dataList['zombie'], id: 0 }];
creaturesInputCheck(dataList['creatures'], dataList['zombie'], dimensions);
var creaturesList = dataList['creatures'];

console.log(`Zombies will move like following:`);
console.log(moves);
console.log(`Zombie 0's position:`);
console.log(zombiesList[0]);
console.log(`Creatures' positions:`);
console.log(creaturesList);
console.log('----------------');

//For zombie groups.
//zombie moves one by one->no new zombies->end;
//                       ->new zombies has be turned->put them to a "wait list"->when all zombie moved, put new zombies to zombieList->check if there are creatures->Yes.new zombie groups move round.
//                                                         ->No. finish.
function zombieGroupMove() {
  let newZombiesList = [];
  let newId = zombiesList[0].id + 1;
  for (let i = 0; i < zombiesList.length; i++) {
    const zombie = zombiesList[i];
    newZombiesList = [...newZombiesList, ...zombieMove(zombie, newId)];
  }
  if (newZombiesList.length > 0) {
    zombiesList = [...newZombiesList, ...zombiesList];
    if (creaturesList.length > 0) {
      zombieGroupMove();
    }
  }
}
// For single zombie:
// zombie move->check position->if yes->take the creature away from the creaturesList->put new zombie to newZombieList->another move;
//                            ->if no ->another move;
//Return newZombiesList;
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

//Zombies are moving and biting!
zombieGroupMove();

//data output:
console.log('----------------');
console.log(`zombies’ positions:`);
let zombieOutput = '';
for (let index = 0; index < zombiesList.length; index++) {
  let { x, y } = zombiesList[index];
  zombieOutput = zombieOutput + `(${x},${y})`;
}
console.log(zombieOutput);
console.log(`creatures’ positions:`);
let creaturesOutput = '';
if (creaturesList.length === 0) {
  console.log('None');
} else {
  for (let index = 0; index < creaturesList.length; index++) {
    let { x, y } = creaturesList[index];
    creaturesOutput = creaturesOutput + `(${x},${y})`;
  }
  console.log(creaturesOutput);
}

module.exports = { zombieMove };
