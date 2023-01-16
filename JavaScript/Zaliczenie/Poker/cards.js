function createCardsDeck() {
  let cardsRanks = [
    "A ",
    "2 ",
    "3 ",
    "4 ",
    "5 ",
    "6 ",
    "7 ",
    "8 ",
    "9 ",
    "10 ",
    "J ",
    "Q ",
    "K ",
  ];

  let cardsSuites = ["hearts(♥)", "clubs(♣)", "diamonds(♦)", "spades(♠)"];
  let cards = [];
  for (let i = 0; i < cardsRanks.length; i++) {
    for (let j = 0; j < cardsSuites.length; j++) {
      cards.push(cardsRanks[i] + cardsSuites[j]);
    }
  }
  return cards;
}

let cardDeck = createCardsDeck();

function pickRandomFive(deck) {
  let pickedCards = [];
  while (pickedCards.length < 5) {
    let card = deck[Math.floor(Math.random() * 52)];
    if (pickedCards.indexOf(card) === -1) {
      pickedCards.push(card);
    }
  }
  return pickedCards;
}

module.exports = pickRandomFive(cardDeck);
