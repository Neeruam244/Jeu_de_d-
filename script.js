var scores, roundScore, activePlayer, gamePlaying, currentDiceValue;

  function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById("round-score-1").textContent = "0";
    document.getElementById("global-score-1").textContent = "0";
    document.getElementById("round-score-2").textContent = "0";
    document.getElementById("global-score-2").textContent = "0";

    document.getElementById("roll-dice-1").disabled = false;
    document.getElementById("hold-1").disabled = false;
    document.getElementById("roll-dice-2").disabled = true;
    document.getElementById("hold-2").disabled = true;

    document.getElementById("new-game").disabled = true;
  }

  function switchPlayer() {
    roundScore = 0;
    document.getElementById("round-score-" + (activePlayer + 1)).textContent = "0";
    activePlayer = activePlayer === 0 ? 1 : 0;

    document.getElementById("roll-dice-1").disabled = !document.getElementById("roll-dice-1").disabled;
    document.getElementById("hold-1").disabled = !document.getElementById("hold-1").disabled;
    document.getElementById("roll-dice-2").disabled = !document.getElementById("roll-dice-2").disabled;
    document.getElementById("hold-2").disabled = !document.getElementById("hold-2").disabled;
  }

  function rollDice() {
    if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6) + 1;
      currentDiceValue = dice;
      var diceDOM = document.getElementById("dice");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice + ".png";

      if (dice !== 1) {
        roundScore += dice;
        document.getElementById("round-score-" + (activePlayer + 1)).textContent = roundScore;
      } else {
        switchPlayer();
      }
  }}

  function hold() {
    if (gamePlaying) {
      scores[activePlayer] += roundScore;
      document.getElementById("global-score-" + (activePlayer + 1)).textContent = scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        document.getElementById("roll-dice-1").disabled = true;
        document.getElementById("hold-1").disabled = true;
        document.getElementById("roll-dice-2").disabled = true;
        document.getElementById("hold-2").disabled = true;
        document.getElementById("round-score-" + (activePlayer + 1)).textContent = "Winner!";
        gamePlaying = false;
        document.getElementById("new-game").disabled = false;
      } else {
        switchPlayer();
      }
    }
  }

  function newGame() {
    init();
    document.getElementById("new-game").disabled = true;
  }

  init();

  document.getElementById("roll-dice-1").addEventListener("click", rollDice);
  document.getElementById("roll-dice-2").addEventListener("click", rollDice);
  document.getElementById("hold-1").addEventListener("click", hold);
  document.getElementById("hold-2").addEventListener("click", hold);
  document.getElementById("new-game").addEventListener("click", newGame);