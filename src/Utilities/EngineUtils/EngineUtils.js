const generateNextBoard = board => {
  let newBoard = [];
  for (let y = 0; y < board.length; y++) {
    newBoard.push([]);
    for (let x = 0; x < board[y].length; x++) {
      let count = 0;
      let newColor = {red: 0, blue: 0, green: 0}
      if (y > 0 && x > 0 && board[y - 1][x - 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y - 1][x - 1].color, count);
      };
      if (y > 0 && board[y - 1][x].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y - 1][x].color, count);
      };
      if (y > 0 && x + 1 < board[y].length && board[y - 1][x + 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y - 1][x + 1].color, count);
      };
      if (x > 0 && board[y][x - 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y][x - 1].color, count);
      };
      if (x + 1 < board[y].length && board[y][x + 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y][x + 1].color, count);
      };
      if (y + 1 < board.length && x > 0 && board[y + 1][x - 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y + 1][x - 1].color, count);
      };
      if (y + 1 < board.length && board[y + 1][x].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y + 1][x].color, count);
      };
      if (y + 1 < board.length && x + 1 < board[y].length && board[y + 1][x + 1].life === true) {
        count += 1
        newColor = blendColor(newColor, board[y + 1][x + 1].color, count);
      };
      if (count < 2 || count > 3) {
        newBoard[y].push({
          life: false,
          color: {
            red: 255,
            green: 255,
            blue: 255
          }
        })
      }
      else if (count === 3 && board[y][x].life === false) {
        newBoard[y].push({
          life: true,
          color: {
            red: newColor.red / 3,
            green: newColor.green / 3,
            blue: newColor.blue / 3
          }
        })
      }
      else if (count >= 2 && count <= 3 && board[y][x].life === true) {
        newBoard[y].push({
          life: true,
          color: board[y][x].color
        })
      }
      else {
        newBoard[y].push({
          life: false,
          color: {
            red: 255,
            green: 255,
            blue: 255
          }
        })
      }
    };
  };
  return newBoard
};

const blendColor = (newColor, cellColor, neighborCount) => {
  if(neighborCount <= 3) {
    return {
      red: newColor.red + cellColor.red,
      blue: newColor.blue + cellColor.blue,
      green: newColor.green + cellColor.green
    }
  }
};

const generateBlankBoard = (width, height) => {
  let board = [];
  for (let y = 0; y < height; y++) {
    board.push([]);
    for (let x = 0; x < width; x++) {
      board[y].push({
        life: false,
        color: {
          red: 255,
          green: 255,
          blue: 255
        }
      })
    };
  };
  return board
};

const generateRandomBoard = (width, height) => {
  let board = [];
  for (let y = 0; y < height; y++) {
    board.push([]);
    for (let x = 0; x < width; x++) {
      let randomLife = Math.floor(Math.random() * 2);
      if (randomLife === 0) {
        board[y].push({
          
          life: false,
          color: {
            red: 255,
            green: 255,
            blue: 255
          }
        })
      }
      else if (randomLife === 1) {
        board[y].push({
          life: true,
          color: {
            red: Math.floor(Math.random() * 256),
            green: Math.floor(Math.random() * 256),
            blue: Math.floor(Math.random() * 256)
          }
        })
      }
    };
  };
  return board
};

export { generateBlankBoard, generateNextBoard, generateRandomBoard }