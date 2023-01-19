const cardDeck = require("./cards.js");

console.log(cardDeck);

// flatten to get rank and suite
let cardsFlat = cardDeck
  .map((card) => {
    return card.split(" ");
  })
  .reduce((acc, curr) => acc.concat(curr), []);

// get all ranks in an array
let cardsInDeckRanks = cardsFlat.filter((value, index, arr) => {
  return index % 2 == 0;
});

// get all suites in an array
let cardsInDeckSuite = cardsFlat.filter((value, index, arr) => {
  return cardsInDeckRanks.indexOf(value) == -1;
});

for (var i = 0; i < cardsInDeckRanks.length; i++) {
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/J/g, "11");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/Q/g, "12");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/K/g, "13");
  cardsInDeckRanks[i] = cardsInDeckRanks[i].replace(/A/g, "14");
}

// check if cards are in sequence +1
const sortedArrayOfNumbers = cardsInDeckRanks.sort((a, b) => a - b).map(Number);

const sequenceIsCorrect = sortedArrayOfNumbers
  .map((num, i) => sortedArrayOfNumbers[i + 1] - num)
  .every((value) => value == 1);

const elementCounts = {};

cardsInDeckRanks.forEach((element) => {
  elementCounts[element] = (elementCounts[element] || 0) + 1;
});

console.log(elementCounts);
// console.log(duplicatedCards.filter));
let checkNumberOfDuplicates = Object.values(elementCounts);

let duplicatedCardsInArray = checkNumberOfDuplicates
  .sort((a, b) => a - b)
  .filter((card, i, arr) => card === arr[2]);

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
  } else if (checkNumberOfDuplicates.includes(4)) {
    console.log("You got Four of a king (Quads)");
  } else if (
    checkNumberOfDuplicates.includes(3) &&
    checkNumberOfDuplicates.includes(2)
  ) {
    console.log("You got Full house");
  } else if (
    checkNumberOfDuplicates.includes(3) &&
    !checkNumberOfDuplicates.includes(2)
  ) {
    console.log("You got Three of a kind");
  } else if (
    checkNumberOfDuplicates.includes(2) &&
    !checkNumberOfDuplicates.includes(3)
  ) {
    if (duplicatedCardsInArray.length === 2) {
      console.log("You got Two pairs");
    } else console.log("You got One pair");
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
