let manyCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
const cardList = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
let gameCardList = [];
let firstCardFlip = false;
let movements = 0;
let countdownFinishGame;
let seconds = 0;
let centiseconds = 0;
let finishSeconds;
let finishCentiseconds;
let timerInterval;

checkNumber(manyCards);

function checkNumber(num) {
    num = Number(num);
    if ((num >= 4) && (num <= 14) && (num % 2 == 0)) {
        startGame(num);
    } else {
        num = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
        checkNumber(num);
    }
}

function startGame (numberOfCards) {
    timer();
    cardList.sort(scramble);
    for (let i = 0; i < numberOfCards/2; i++) {
        gameCardList.push(cardList[i], cardList[i]);
        countdownFinishGame = gameCardList.length / 2;
    }
    gameCardList.sort(scramble);
    const gameZone = document.querySelector(".game-zone");
    for (let j = 0; j < gameCardList.length; j++) {
        gameZone.innerHTML += 
        `<div class="card back-face ${gameCardList[j]} pos${j}" onclick="clickCards(this, ${j});">
            <img class="back-face" src="./midia/parrot-card-game/card-backface.png" alt="">
            <img class="front-face" src="./midia/parrot-card-game/${gameCardList[j]}.gif" alt="">
        </div>`
    }
}

function scramble() { 
	return Math.random() - 0.5; 
}

function clickCards(cardState, position) {
    
    if ((cardState == document.querySelector(`.card.back-face.pos${position}`)) && (firstCardFlip == false)) {
        firstCardType = gameCardList[position];
        flipCards(cardState);
        firstCardPosition = position;
        firstCardFlip = true;
    } else if ((cardState == document.querySelector(`.card.back-face.pos${position}`)) && (firstCardFlip == true)){
        secondCardType = gameCardList[position];
        flipCards(cardState);
        secondCardPosition = position;
        compareCards(firstCardType, secondCardType, firstCardPosition, secondCardPosition);
        firstCardFlip = false;
    }
}

function flipCards(cardToFlip) {
    cardToFlip.classList.add("flip");
    setTimeout(() => {
        cardToFlip.classList.remove("back-face");
        cardToFlip.classList.add("front-face");
        }, 200)
    movements++;
}

function compareCards(firstCard, secondCard, firstPosition, secondPosition) {
    if (firstCard === secondCard) {
        document.querySelector(`.card.pos${firstPosition}.flip`).classList.remove("flip");
        document.querySelector(`.card.pos${secondPosition}.flip`).classList.remove("flip");
        countdownFinishGame--;
        if (countdownFinishGame == 0) {
            finishGame();
        }
    } else {
        setTimeout(() => {
            document.querySelector(`.card.front-face.${firstCard}.pos${firstPosition}.flip`).classList.remove("flip");
            document.querySelector(`.card.front-face.${secondCard}.pos${secondPosition}.flip`).classList.remove("flip");
            document.querySelector(`.card.front-face.${firstCard}.pos${firstPosition}`).classList.remove("front-face");
            document.querySelector(`.card.${firstCard}.pos${firstPosition}`).classList.add("back-face");
            document.querySelector(`.card.front-face.${secondCard}.pos${secondPosition}`).classList.remove("front-face");
            document.querySelector(`.card.${secondCard}.pos${secondPosition}`).classList.add("back-face");
        }, 1000)
    }
}

function finishGame() {
    
    setTimeout(() => {
    alert(`Você ganhou em ${movements} jogadas e em ${finishSeconds}${finishCentiseconds}!`);
    askStartNewGame();
    }, 300)
    
}
        
function timer() {
        document.querySelector(".timer .seconds").innerHTML = seconds;
        document.querySelector(".timer .seconds").innerHTML = centiseconds;
        centisecondsInterval = setInterval(incrementTimer, 10);
}

function incrementTimer() {
    centiseconds++;
    if (seconds < 1) {
        document.querySelector(".timer .seconds").innerHTML = `00.`;
    }
    if ((countdownFinishGame == 0) && (movements >= 4)) {
        finishCentiseconds = document.querySelector(".timer .centiseconds").innerHTML;
        finishSeconds = document.querySelector(".timer .seconds").innerHTML;
        clearInterval(timerInterval);
    } else if (centiseconds < 10) {
        document.querySelector(".timer .centiseconds").innerHTML = `0${centiseconds}s`;
    } else if (centiseconds < 100) {
        document.querySelector(".timer .centiseconds").innerHTML = `${centiseconds}s`;
    } else if (centiseconds == 100) {
        centiseconds = 0;
        seconds++;
        if (seconds < 10){
            document.querySelector(".timer .seconds").innerHTML = `0${seconds}.`;
        } else {
            document.querySelector(".timer .seconds").innerHTML = `${seconds}.`;
        }
    }
}

function askStartNewGame(){
    question = prompt("Deseja reiniciar a partida?\n(Digite 'sim' ou 'não')");
    if (question === "sim") {
        for (let k = 0; k < gameCardList.length; k++) {
            document.querySelector(`.card.pos${k}`).remove();
        }
        gameCardList = [];
        movements = 0;
        seconds = 0;
        centiseconds = 0;
        manyCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
        checkNumber(manyCards);
    } else if (question === "não") {
        alert("Obrigado pela participação!");
    } else {
        askStartNewGame();
    }
}
