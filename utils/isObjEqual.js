function isObjEqual(obj1, obj2) {
  let props1 = Object.getOwnPropertyNames(obj1);
  let props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i++) {
    let propName = props1[i];
    if (obj1[propName] !== obj2[propName]) {
      return false;
    }
  }
  return true;
}

module.exports = { isObjEqual };
