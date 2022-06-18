let numberOfCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
checkNumber();

function checkNumber(numberOfCards) {
    numberOfCards = Number(numberOfCards);
    if ((numberOfCards >= 4) && (numberOfCards <= 14) && (numberOfCards % 2 == 0)) {
        alert("deu certo!");
    } else {
        numberOfCards = prompt("Com quantas cartas deseja jogar?\n(Escolha um nº entre 4 a 14)");
        checkNumber(numberOfCards);
    }
}