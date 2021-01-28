const winnerMessage = document.getElementById("winnerMessage");
const firstPlayerMarcador = document.getElementById("firstPlayerMarcador");
const machinePlayerMarcador = document.getElementById("machineMarcador");
const btnReset = document.getElementById("btn-reset");
const line = document.getElementById("line");
let cells = Array.from(document.querySelectorAll(".col"));
let firstPlayerTurn = true;
let emptyCells = [];
let machineCell;
let someOneWon = false;
let firstPlayerWins = 0;
let machineWins = 0;
let remainCells;

// Boton reinicio
btnReset.addEventListener("click", () => {
  cells.map((cell) => (cell.textContent = ""));
  someOneWon = false;
  winnerMessage.textContent = " ";
  line.style.width = "unset";
  line.style.height = "unset";
  line.style.marginTop = "unset";
  line.style.top = "unset";
  line.style.marginLeft = "unset";
  line.style.left = "unset";
  line.style.transform = "unset";
  line.style.transformOrigin = "unset";
});

// Función detectar celdas vacias
let getEmptyCells = () => {
  emptyCells = cells.filter((cell) => cell.textContent == "");
};

// Función jugada jugador 1
const firstPlayerMove = (cell) => (cell.textContent = "O");

// Función jugada máquina
const machineMove = () => {
  getEmptyCells("X");
  if (emptyCells.length > 0) {
    // Marca una celda aleatoria que este vacia
    machineCell = Math.floor(Math.random() * emptyCells.length);
    emptyCells[machineCell].textContent = "X";
  }
};

// Verificar si hay ganador por filas
const verifyRow = (player) => {
  for (let i = 1; i <= 3; i++) {
    let row = Array.from(document.querySelectorAll(`.row-${i}`));
    console.log(row);
    let rowValues = row.map((currentCell) => currentCell.textContent);
    console.log(rowValues);
    let verifyRowValues = rowValues.filter((rowValue) => rowValue === player);
    console.log(verifyRowValues);
    if (verifyRowValues.length === 3) {
      someOneWon = true;
      line.style.width = "90%";
      line.style.height = "0.25em";
      line.style.top = `calc(${4 + (i - 1) * 8}rem + 0.125rem)`;
    }
  }
};

// Verificar si hay ganador por columnas
const verifyColumn = (player) => {
  for (let i = 1; i <= 3; i++) {
    let column = Array.from(document.querySelectorAll(`.col-${i}`));
    let columnValues = column.map((currentCell) => currentCell.textContent);
    let verifyColumnValues = columnValues.filter(
      (columnValue) => columnValue === player
    );
    if (verifyColumnValues.length === 3) {
      someOneWon = true;
      line.style.height = "90%";
      line.style.width = "0.25rem";
      line.style.marginTop = "5%";
      line.style.left = `calc(${4 + (i - 1) * 8}rem + 0.125rem)`;
    }
  }
};

// Verificar si hay ganador por diagonales
const verifyDiagonal = (player) => {
  for (let i = 1; i <= 2; i++) {
    let diagonal = Array.from(document.querySelectorAll(`.d-${i}`));
    let diagonalValues = diagonal.map((currentCell) => currentCell.textContent);
    let verifyDiagonalValues = diagonalValues.filter(
      (diagonalValue) => diagonalValue === player
    );
    if (verifyDiagonalValues.length === 3) {
      someOneWon = true;
      line.style.height = "100%";
      line.style.width = "0.25em";
      line.style.transformOrigin = "center center";
      if (i == 1) {
        line.style.transform = "rotate(-45deg)";
      } else {
        line.style.transform = "rotate(45deg)";
      }
    }
  }
};

// Funcion determinar si hay ganador
const verifyIfWon = (player) => {
  verifyRow(player);
  verifyColumn(player);
  verifyDiagonal(player);
};

// Logica del juego
cells.map((cell) => {
  cell.addEventListener("click", () => {
    // Marca la celda solo si esta esta vacía
    if (cell.textContent == "" && !someOneWon) {
      // Jugada jugador 1
      firstPlayerMove(cell);
      // Determinamos si gano el jugador
      verifyIfWon("O");
      remainCells = cells.filter((cell) => cell.textContent == "");
      if (someOneWon == true) {
        firstPlayerWins++;
        firstPlayerMarcador.textContent = `Jugador: ${firstPlayerWins}`;
        winnerMessage.textContent = "Ganaste, felicitaciones.";
      }
    }
    if (!someOneWon) {
      // Jugada maquina
      machineMove();
      // Determinamos si gano la maquina
      verifyIfWon("X");
      remainCells = cells.filter((cell) => cell.textContent == "");
      if (someOneWon == true) {
        machineWins++;
        machinePlayerMarcador.textContent = `Máquina: ${machineWins}`;
        winnerMessage.textContent =
          "Ganó la máquina, más suerte para la próxima.";
      }
    }
    if (!someOneWon && remainCells.length == 0) {
      winnerMessage.textContent =
        "Qué lástima nadie ganó, más suerte para la próxima.";
    }
  });
});
