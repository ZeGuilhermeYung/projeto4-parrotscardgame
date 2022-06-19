let manyCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
const cardList = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
const gameCardList = [];
let cardsFlipped = false;
let movements = 0;

checkNumber(manyCards);

function checkNumber(num) {
    num = Number(num);
    if ((num >= 4) && (num <= 14) && (num % 2 == 0)) {
        //alert("deu certo!");
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
    }
    gameCardList.sort(scramble);
    const gameZone = document.querySelector(".game-zone");
    for (let j = 0; j < gameCardList.length; j++) {
        gameZone.innerHTML += 
        `<div class="card back-face ${gameCardList[j]}" onclick="compareCards(this, ${j});">
            <img class="back-face" src="./midia/parrot-card-game/card-backface.png" alt="">
            <img class="front-face" src="./midia/parrot-card-game/${gameCardList[j]}.gif" alt="">
        </div>`
    }
}
function compareCards(cardState, position) {
    cardType = gameCardList[position];
    if ((cardState == document.querySelector(`.card.back-face.${cardType}`)) && (cardsFlipped == false)) {
        cardState.classList.remove("back-face");
        cardState.classList.add("front-face");
        cardsFlipped = true;
        movements++;
    }
    //alert(cardType);
}
function scramble() { 
	return Math.random() - 0.5; 
}