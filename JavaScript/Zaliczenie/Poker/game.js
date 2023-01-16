const cardDeck = require("./cards.js");

console.log(cardDeck);

// flatten to get rank and suite
let cardsFlat = cardDeck
  .map((card) => {
    return card.split(" ");
  })
  .flat(2);

// get all ranks in an array
let cardsInDeckRanks = cardsFlat.filter((value, index, arr) => {
  return index % 2 == 0;
});

for (var i = 0; i < cardsInDeckRanks.length; i++) {
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/J/g, "11");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/Q/g, "12");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/K/g, "13");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/A/g, "14");
}

// get all suites in an array
let cardsInDeckSuite = cardsFlat.filter((value, index, arr) => {
  return cardsInDeckRanks.indexOf(value) == -1;
});

// check if cards are in sequence +1
const sequenceIsCorrect = () => {
  cardsInDeckRanks.sort((a, b) => a - b).map(Number);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] == 1) {
      return true;
    }
  }
  return false;
};

const countPairs = (arr) => {
  let count = 1;
  let dupChars = [];
  // making a shallow copy so that the original array remains unaltered
  const copy = arr.slice();
  copy.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (copy[i] === copy[i + 1]) {
      count++;
    }
    for (let i = 0; i < copy.length; i++) {
      for (let j = i + 1; j < copy.length; j++) {
        if (copy[i] == copy[j]) {
          dupChars.push(copy[i]);
        }
        // dupChars = copy.filter((element, index) => {
        //   return copy.indexOf(element) === index;
        // });
      }
    }
    console.log(dupChars);
    return count;
  }
};

let duplicatedCards = cardsInDeckRanks
  .sort((a, b) => a - b)
  .filter((card, i, arr) => card === arr[2]);

let duplicatedCardsBackwards = cardsInDeckRanks
  .sort((a, b) => a - b)
  .filter((card, i, arr) => card === arr[1]);
console.log(duplicatedCardsBackwards);

function checkSeniorityOfCards() {
  // Same suite situations
  if (cardsInDeckSuite.every((suite) => suite === cardsInDeckSuite[0])) {
    // Royal flush
    if (
      cardsInDeckRanks.includes("14") &&
      cardsInDeckRanks.includes("13") &&
      cardsInDeckRanks.includes("12") &&
      cardsInDeckRanks.includes("11") &&
      cardsInDeckRanks.includes("10")
    ) {
      console.log("You got Royal flush!");
    } else if (sequenceIsCorrect) {
      // Straight flush
      console.log("You got Straight flush!");
    } else {
      // Flush
      console.log("You got flush");
    }
  } else if (sequenceIsCorrect) {
    // Straight
    console.log("You got straight");
  } else if (countPairs > 1) {
    if (duplicatedCards.length === 4) {
      console.log("You got Four of a king (Quads)");
    } else if (duplicatedCards.length === 3) {
      if (duplicatedCardsBackwards.length === 2) {
        console.log("You got Full house");
      } else console.log("You got Three of a kind");
    } else if (duplicatedCards.length === 2 && duplicatedCardsBackwards === 2) {
      console.log("You got Two pairs");
    } else if (duplicatedCards.length === 2 && duplicatedCardsBackwards !== 2) {
      console.log("You got One pair");
    }
  } else if (
    cardsInDeckRanks.includes("14") ||
    cardsInDeckRanks.includes("13") ||
    cardsInDeckRanks.includes("12") ||
    cardsInDeckRanks.includes("11") ||
    cardsInDeckRanks.includes("10")
  ) {
    console.log("You may have High card");
  }
}

checkSeniorityOfCards();
