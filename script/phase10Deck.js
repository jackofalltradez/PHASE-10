
// Function to generate the Phase 10 deck as card div objects
function generatePhase10DeckAsDivs() {
  const colors = ['red', 'blue', 'yellow', 'green'];
  const numbers = Array.from({ length: 24 }, (_, index) => index % 12 + 1);

  // Generate numbered cards for each color
  const numberedCards = colors.flatMap(color =>
    numbers.map(number => createCardObject(color, number, 'normal', location))
  );

  // Generate wild cards
  const wildCards = Array.from({ length: 8 }, (_, index) => createCardObject('black', 'Wild', 'special'));

  // Generate skip cards
  const skipCards = Array.from({ length: 4 }, (_, index) => createCardObject('black', 'Skip', 'special'));

  // Combine all card objects into a single array
  const cardObjects = [...numberedCards, ...wildCards, ...skipCards];

  return cardObjects;
}

// Helper function to create a card object
function createCardObject(color, number, type, front, back) {
  return {
    color,
    number,
    type,
  };
}


// Example usage
// const numPlayers = 6; // Replace with your desired number of players
 const phase10DeckAsObjects = generatePhase10DeckAsDivs();
//  console.log(phase10DeckAsObjects);

 export { phase10DeckAsObjects };

// You can insert the generated HTML into your document as needed.
// For example:
// document.getElementById('your-container-id').innerHTML = phase10DeckDivs;

// export { phase10DeckDivs }

// You can insert the generated HTML into your document as needed.
// For example:
// document.getElementById('your-container-id').innerHTML = phase10DeckDivs;


/*{ <div class="card" data-color="red" data-number="1" data-type="normal" onclick="toggleCardSelection('player4', 'hand', 1)"></div>*/
