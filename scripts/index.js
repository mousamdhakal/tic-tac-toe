const Player = (name) => {
  let moves = [];
  const wins = () => {
    return name;
  };
  const setmoves = (move) => {
    moves.push(move);
  };
  const showmoves = () => {
    return moves;
  };
  const clearmoves = () => {
    moves.length = 0;
  };
  return { wins, setmoves, showmoves, clearmoves };
};

let tieVariable = 0;
let win = false;
const game = () => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const first_player = document.getElementById("first").value;
  const second_player = document.getElementById("second").value;
  const Player1 = Player(first_player);
  const Player2 = Player(second_player);
  const checkGameOver = (Player) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winCombos.length; i++) {
      if (winCombos[i].every((i) => Player.showmoves().includes(i))) {
        let changing = document.getElementById("reset-button");
        changing.innerText = "Play Again";
        win = true;
        let winText = document.getElementById("result-text");
        winText.innerText = `${Player.wins()} has won the game`;
        winText.style.display = "block";
        let board = document.getElementsByClassName("grid-container")[0];
        board.style.display = "none";
      }
    }
  };
  // Player1.sayName();
  // Player2.sayName();
  const paintBoard = () => {
    board = document.getElementById("board");
    let count = 0;
    for (element of board.children) {
      element.innerHTML = "";
      let newspan = document.createElement("span");
      newspan.setAttribute("class", "innertext");
      newspan.innerHTML = gameboard[count];
      element.appendChild(newspan);
      count++;
    }
  };

  const setValue = (id) => {
    let element = document.getElementById(`${id}`);
    if (element.innerText == "") {
      if (turn) {
        checkerValue = "X";
        turn = false;
        Player1.setmoves(Number(id));
      } else {
        checkerValue = "0";
        turn = true;
        Player2.setmoves(Number(id));
      }
      tieVariable++;
      gameboard[id] = checkerValue;

      let newspan = document.createElement("span");
      newspan.setAttribute("class", "innertext");
      newspan.innerHTML = gameboard[id];
      element.appendChild(newspan);
      // paintBoard();
      Player1.showmoves();
      Player2.showmoves();
      turn ? checkGameOver(Player2) : checkGameOver(Player1);
      if (tieVariable == 9 && win == false) {
        let winText = document.getElementById("result-text");
        winText.innerText = `There's been a tie`;
        winText.style.display = "block";
        let changing = document.getElementById("reset-button");
        changing.innerText = "Play Again";
        let board = document.getElementsByClassName("grid-container")[0];
        board.style.display = "none";
      }
    }
  };

  function resetBoard() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    Player1.clearmoves();
    Player2.clearmoves();
    paintBoard();
    turn = true;
    tieVariable = 0;
    win = false;
  }
  return { setValue, resetBoard };
};
let newgame;
function startGame() {
  newgame = game();
  let intro = document.getElementById("intro");
  intro.style.display = "none";
  let board = document.getElementsByClassName("grid-container")[0];
  board.style.display = "grid";
  let reset = document.getElementsByClassName("reset")[0];
  reset.style.display = "block";
}

function resetGame() {
  newgame.resetBoard();
  let intro = document.getElementById("intro");
  intro.style.display = "block";
  let board = document.getElementsByClassName("grid-container")[0];
  board.style.display = "none";
  let reset = document.getElementsByClassName("reset")[0];
  reset.style.display = "none";
  let winText = document.getElementById("result-text");
  winText.innerText = ``;
  winText.style.display = "none";
}
// newgame.paintBoard();
let turn = true;

function clicked(incoming) {
  newgame.setValue(incoming.id);
}
