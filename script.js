"use strict";
//selecting condition
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

let scorearray, playing, calcurrentScore, activeplayer;

//--------initalizing values when refreshed or when pressed newgame-------------------------------------------------------

const init = function () {
  playing = true;
  calcurrentScore = 0;
  activeplayer = 0;
  scorearray = [0, 0];

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

//switching player function
const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  calcurrentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
init();
//--------------------------------------------------------------------

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1.generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      calcurrentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        calcurrentScore;
    } else {
      //switch to next player
      switchplayer();
    }
  }
});

//---------------------------------------------------------------------

//hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    //add score to the array
    scorearray[activeplayer] += calcurrentScore;

    // display the score in te main score board
    document.getElementById(`score--${activeplayer}`).textContent =
      scorearray[activeplayer];

    //check if the score is greater than 100
    if (scorearray[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //swithch player when hold is pressed
      switchplayer();
    }
  }
});

//---------------------------------------------------------------------------
//new button
btnNew.addEventListener("click", init);
