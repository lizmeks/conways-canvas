const generateNextBoard = board => {
  let newBoard = [];
  for (let y = 0; y < board.length; y++) {
    newBoard.push([]);
    for (let x = 0; x < board[y].length; x++) {
      let count = 0;
      if (y > 0 && x > 0 && board[y - 1][x - 1].life === true) {
        count += 1
      };
      if (y > 0 && board[y - 1][x].life === true) {
        count += 1
      };
      if (y > 0 && x + 1 < board[y].length && board[y - 1][x + 1].life === true) {
        count += 1
      };
      if (x > 0 && board[y][x - 1].life === true) {
        count += 1
      };
      if (x + 1 < board[y].length && board[y][x + 1].life === true) {
        count += 1
      };
      if (y + 1 < board.length && x > 0 && board[y + 1][x - 1].life === true) {
        count += 1
      };
      if (y + 1 < board.length && board[y + 1][x].life === true) {
        count += 1
      };
      if (y + 1 < board.length && x + 1 < board[y].length && board[y + 1][x + 1].life === true) {
        count += 1
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
            red: 0,
            green: 0,
            blue: 0
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

export { generateBlankBoard, generateNextBoard }