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
      if (y > 0 && x <= board[y].length && board[y - 1][x + 1].life === true) {
        count += 1
      };
      if (x > 0 && board[y][x - 1].life === true) {
        count += 1
      };
      if (x <= board[y].length && board[y][x + 1].life === true) {
        count += 1
      };
      if (y <= board.length && x > 0 && board[y + 1][x - 1].life === true) {
        count += 1
      };
      if (y <= board.length && board[y + 1][x].life === true) {
        count += 1
      };
      if (y <= board.length && x <= board[y].length && board[y + 1][x + 1].life === true) {
        count += 1
      };
      if (count < 2 || count > 3) {
        newBoard[y].push({life: false})
      }
      else if (count === 3 && board[y][x].life === false) {
        newBoard[y].push({life: true})
      }
      else if (2 <= count <= 3 && board[y][x].life === true) {
        newBoard[y].push({life: true})
      };
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
        color: "FFFFFF"
      })
    };
  };
  return board
};

export { generateBlankBoard, generateNextBoard }