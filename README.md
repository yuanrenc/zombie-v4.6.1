# Zombie Apocalypse v4.6.1- Ailo

### Author

---

Xuan WANG

### Version

---

Node.js v14.18.0

### Run

---

```
node main.js
```

### Test

---

Install Jest using ::npm:::

```
npm install
```

Run test

```
Npm run test
```

### Highlights

---

- Recursion has been used, to make the logic clear.
- Good file instruction and code quality.
- Well edges cases handle.

### Input Data

---

Example of input of data (JSON format)

- dimensions of the area (N)
- the initial position of the zombie
- a list of positions of poor creatures
- a list of moves zombies will make U (Up), D (Down), L (Left), R (Right)

```
{
  “dimensions”: 4,
  “zombie”: {
    “x”: 2,
    “y”: 1
  },
  “creatures”: [
    {
      “x”: 3,
      “y”: 1
    },
    {
      “x”: 1,
      “y”: 2
    },
    {
      “x”: 2,
      “y”: 2
    }
  ],
  “moves”: “DLUURDDDRRLL”
}
```

Data position

To modify input data, please go to:

```
/data/demo.json
```
