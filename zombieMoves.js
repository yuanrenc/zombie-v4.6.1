function move(N, zombie, dimensions) {
  switch (N) {
    case 'R':
      if (zombie['x'] === dimensions - 1) {
        zombie['x'] = 0;
        return zombie;
      } else {
        zombie['x'] = zombie['x'] + 1;
        return zombie;
      }
    case 'L':
      if (zombie['x'] === 0) {
        zombie['x'] = dimensions - 1;
        return zombie;
      } else {
        zombie['x'] = zombie['x'] - 1;
        return zombie;
      }
    case 'U':
      if (zombie['y'] === 0) {
        zombie['y'] = dimensions - 1;
        return zombie;
      } else {
        zombie['y'] = zombie['y'] - 1;
        return zombie;
      }
    case 'D':
      if (zombie['y'] === dimensions - 1) {
        zombie['y'] = 0;
        return zombie;
      } else {
        zombie['y'] = zombie['y'] + 1;
        return zombie;
      }
  }
}

module.exports = { move };
