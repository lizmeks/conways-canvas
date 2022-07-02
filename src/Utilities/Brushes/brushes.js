const brushes = [

  {
    name: "dot",
    value: [
      [1]
    ],
    type: "paint tool",
    id: 1
  },

  {
    name: "diamond",
    value: [
      [0,0,1,0,0],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [0,0,1,0,0],
    ],
    type: "pattern",
    id: 2
  },
  
  {
    name: "block",
    value: [
      [1,1],
      [1,1]
    ],
    type: "still life",
    id: 3
  },

  {
    name: "blinker",
    value: [
      [0,0,0],
      [1,1,1],
      [0,0,0]
    ],
    type: "oscillator",
    id: 4
  },

  {
    name: "toad",
    value: [
      [0,1,1,1],
      [1,1,1,0]
    ],
    type: "oscillator",
    id: 5
  },

  {
    name: "glider",
    value: [
      [0,0,1],
      [1,0,1],
      [0,1,1]
    ],
    type: "spaceship",
    id: 6
  },

];

export default brushes;