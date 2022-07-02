const brushes = [

  {
    name: "dot",
    brush: [
      [1]
    ],
    id: 1
  },

  {
    name: "diamond",
    brush: [
      [0,0,1,0,0],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [0,0,1,0,0],
    ],
    id: 2
  },
  
  {
    name: "block",
    brush: [
      [0,1,1],
      [0,1,1]
    ],
    id: 3
  },

  {
    name: "blinker",
    brush: [
      [0,0,0],
      [1,1,1],
      [0,0,0]
    ],
    id: 4
  },

  {
    name: "toad",
    brush: [
      [0,1,1,1,0],
      [1,1,1,0,0]
    ],
    id: 5
  },

  {
    name: "glider",
    brush: [
      [0,0,1],
      [1,0,1],
      [0,1,1]
    ],
    id: 6
  },

];

export default brushes;