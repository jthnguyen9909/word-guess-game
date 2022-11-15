var timerElement = document.querySelector(".timer-count");
var gameSpace = document.querySelector(".word-guess");
var startButton = document.querySelector(".start-button");
var win = document.querySelector("#user-wins");
var loss = document.querySelector("#user-losses");

var chosenWord = "";
var isWin = false;
var timerCount;
var winCount = 0;
var lossCount = 0;
var blanksNumber = 0;

var blanksLetters = [];
var letters = [];

var words = [
  "attribute",
  "event",
  "github",
  "variable",
  "object",
  "function",
  "timer",
];
function init() {
  getWins();
  getLosses();
}

function startGame() {
  isWin = false;
  timerCount = 10;

  startButton.disabled = true;
  renderChosenWord();
  startTimer();
}

function gameWin() {
  gameSpace.textContent = "YOU WIN!";
  winCount++;
  startButton.disabled = false;
  setWins();
}

function gameLoss() {
  gameSpace.textContent = "YOU LOSE!";
  lossCount++;
  startButton.disabled = false;
  setLosses();
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        gameWin();
      }
    } else if (timerCount === 0) {
      clearInterval(timer);
      gameLoss();
    }
  }, 1000);
}

function renderChosenWord() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  letters = chosenWord.split("");
  blanksNumber = letters.length;
  blanksLetters = [];
  for (var i = 0; i < blanksNumber; i++) {
    blanksLetters.push("_");
  }
  gameSpace.textContent = blanksLetters.join(" ");
}

function setWins() {
  win.textContent = winCount;
  localStorage.setItem("winCount", winCount);
}
function setLosses() {
  loss.textContent = lossCount;
  localStorage.setItem("lossCount", lossCount);
}

function getWins() {
  var storedWins = localStorage.getItem("winCount");
  if ((storedWins = null)) {
    winCount = 0;
  } else {
    winCount = storedWins;
  }
}

function getLosses() {
  var storedLosses = localStorage.getItem("lossCount");
  if ((storedLosses = null)) {
    lossCount = 0;
  } else {
    lossCount = storedLosses;
  }
}

function checkLetter(letter) {
  var letterInWord = false;
  for (var i = 0; i < blanksNumber; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < blanksNumber; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    gameSpace.textContent = blanksLetters.join(" ");
  }
}

// function checkWin() {}

document.addEventListener("keydown", function (event) {
  if (timerCount === 0) {
    return;
  }

  var key = event.key.toLowerCase();
  var alphaNumericChars = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

  if (alphaNumericChars.includes(key)) {
    var letterGuessed = event.key;
    checkLetter(letterGuessed);
    
  }
});

startButton.addEventListener("click", startGame);
