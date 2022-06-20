let manyCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
const cardList = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
const gameCardList = [];
let firstCardFlip = false;
let movements = 0;
let countdownFinishGame = 0;

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
    cardList.sort(scramble);
    for (let i = 0; i < numberOfCards/2; i++) {
        gameCardList.push(cardList[i]);
        gameCardList.push(cardList[i]);
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
    cardType = gameCardList[position];
    if ((cardState == document.querySelector(`.card.back-face.${cardType}.pos${position}`)) && (firstCardFlip == false)) {
        flipCards(cardState);
        firstCardFlip = true;
        firstCardType = cardType;
        firstCardPosition = position;
    } else if ((cardState == document.querySelector(`.card.back-face.${cardType}.pos${position}`)) && (firstCardFlip == true)){
        flipCards(cardState);
        secondCardType = cardType;
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
    alert(`Você ganhou em ${movements} jogadas!`);
    }, 300)
}
