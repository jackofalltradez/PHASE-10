import { phase10DeckAsObjects } from './phase10Deck.js';

 function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

const discardPile = [];
const drawPile = [];

const numPlayers = parseInt(prompt('Enter the number of players (2-6):')) || 2;
const numPhases = parseInt(prompt('Enter the number of phases (1-10):')) || 10;


// Function to create an array of player objects
function createPlayers() {
  const players = [];

  for (let i = 1; i <= numPlayers; i++) {
    const playerName = prompt(`Enter the name for Player ${i}:`) || `Player ${i}`;
    const player = createPlayer(playerName);
    players.push(player);
  }

  return players;
}


// // Implement a function to randomize the order and selection of phases to achieve as a new feature. Also, look into making each phase a single function of the actual checking process. Randomize the list(Players can have different phases to work on)

const phase10List = [
  { phase1: '2 sets of 3' },
  { phase2: '1 set of 3 + 1 run of 4' },
  { phase3: '1 set of 4 + 1 run of 4' },
  { phase4: '1 run of 7' },
  { phase5: '1 run of 8' },
  { phase6: '1 run of 9' },
  { phase7: '2 sets of 4' },
  { phase8: '7 cards of 1 color' },
  { phase9: '1 set of 5 + 1 set of 2' },
  { phase10: '1 set of 5 + 1 set of 3' },
];

function dealCards(players, cardsPerPlayer) {
  shuffleDeck(phase10DeckAsObjects);

  players.forEach(player => {
    player.handCards = phase10DeckAsObjects.splice(0, cardsPerPlayer);
  });
}

function initializeGame() {
  const discardPileList = document.getElementById('discard-pile-container');

  // Add event listener for drag start
  discardPileList.addEventListener('dragstart', handleDragStart);

  // Add event listener for drag over
  discardPileList.addEventListener('dragover', handleDragOver);

  // Add event listener for drop
  discardPileList.addEventListener('drop', handleDrop);

  const players = initializePlayers();
  shuffleDeck(phase10DeckAsObjects);
  dealCards(players, 10);

  const drawPile = phase10DeckAsObjects.slice();
  const discardPile = [];
  const topCard = drawPile.pop();
  discardPile.push(topCard);

  //Display the drawPile on the UI
  displayDrawPile(drawPile, discardPile);

  addPlayerToGameContainer(numPlayers, players); 

  console.log('Game initialized:', { players, numPhases, drawPile, discardPile });
}

// Function to handle drag start
function handleDragStart(event) {
  const draggedCard = event.target;
  event.dataTransfer.setData('text/plain', draggedCard.id);
}

// Function to handle drag over
function handleDragOver(event) {
  event.preventDefault();
}

// Function to handle drop
function handleDrop(event) {
  event.preventDefault();
  const draggedCardId = event.dataTransfer.getData('text/plain');
  const draggedCard = document.getElementById(draggedCardId);

  // Add logic here to handle dropping the card into the discard pile
  // You can update the UI and game state accordingly
}


  function initializePlayers() {
    const playerNames = getPlayerNames(numPlayers);
    const players = playerNames.map(name => createPlayerContainerInfo(name));
    return players;
  }
  
  function createPlayerContainerInfo(name) {
    return {
      name,
      currentPhase: phase10List[0],
      handCards: [],
      phaseCards: [],
      score: 0,
    };
  }
  
  function getPlayerNames(numPlayers) {
    const playerNames = [];
    for (let i = 1; i <= numPlayers; i++) {
      const playerName = prompt(`Enter the name for Player ${i}:`);
      playerNames.push(playerName || `Player ${i}`);
    }
    return playerNames;
  }


  function addPlayerToGameContainer(numPlayers, players) {
    const gameContainer = document.getElementById('game-container');
  
    for (let playerNumber = 0; playerNumber < numPlayers; playerNumber++) {
      // Create a new player element
      const player = players[playerNumber];
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container');
      playerContainer.id = `player${playerNumber + 1}-container`;
  
      // Add HTML content for the player
      playerContainer.innerHTML = `
        <div class="playersInfo">
          <div>
            <h2>${player.name}</h2>
          </div>
          <div>${player.currentPhase}</div>
          <div>${player.score}</div>
        </div>
  
        <div class="hand-card-container" id="player${playerNumber + 1}-hand-cards">
          ${generateCardElements(player.handCards)}
        </div>
  
        <div class="phase-card-container" id="player${playerNumber + 1}-phase-cards">
          ${generateCardElements(player.phaseCards)}
        </div>
      `;
  
  
      // Append the new player to the game container
      gameContainer.appendChild(playerContainer);
    }
  }
  
  
  // Helper function to generate card elements based on an array of cards

  function generateCardElements(cards) {
    if (!Array.isArray(cards)) {
      console.error('Error: cards is not an array', cards);
      return '';
    }

    return cards.map(card => {
      if (card.number === 'Wild') {
        //Handle 'Wild' cards
        return `
          <div class="card ${card.color}" data-type="${card.type}">
            <span class="num">${card.number}</span>
            <span class="corner top">
              <span>W</span>
            </span>
            <span class="corner bottom">
              <span>W</span>
            </span>
          </div>`;
      } else if (card.number === 'Skip') {
        //Handle 'Skip' cards
        return `
          <div class="card ${card.color}" "data-type="${card.type}">
            <span class="num">${card.number}</span>
            <span class="corner top">
              <span>S</span>
            </span>
            <span class="corner bottom">
              <span>S</span>
            </span>
          </div>`;
      } else if (card.number === 6) {
        //Handle 'Underlined' cards
        return `
          <div class="card ${card.color} underline" data-type="${card.type}">
            <span class="num">${card.number}</span>
            <span class="corner top">
              <span>${card.number}</span>
            </span>
            <span class="corner bottom">
              <span>${card.number}</span>
            </span>
          </div>
          `;
      } else {
        //Handle all 'Normal' cards
        return `
          <div class="card ${card.color}" data-type="${card.type}">
            <span class="num">${card.number}</span>
            <span class="corner top">
              <span>${card.number}</span>
            </span>
            <span class="corner bottom">
              <span>${card.number}</span>
            </span>
          </div>
        `;
      }
    }).join('');
  }



  // Function to display the drawPile on the UI
function displayDrawPile(drawPile, discardPile) {
  const drawPileContainer = document.getElementById('card-deck-container');
  const discardPileContainer = document.getElementById('discard-pile-container');
  

  // Create new divs for drawPile and discardPile
  const drawPileDiv = document.createElement('div');
  const discardPileDiv = document.createElement('div');

  // Set IDs for the divs
  drawPileDiv.id = 'card-deck';
  discardPileDiv.id = 'discard-pile';
  

  // Generate HTML for each card in the drawPile and discardPile
  const drawPileHTML = generateCardElements(drawPile);
  const discardPileHTML = generateCardElements(discardPile);

  // Append the generated HTML to the drawPileList and discardPileList
  drawPileDiv.innerHTML = drawPileHTML;
  discardPileDiv.innerHTML = discardPileHTML;

  // Append the drawPileList and discardPileList to the drawPileContainer and discardPileContainer
  drawPileContainer.appendChild(drawPileDiv);
  discardPileContainer.appendChild(discardPileDiv);


  // Set up event listeners for dragging and dropping cards from the drawPile
}

//Function to handle card flip
// function flipCard(card) {
//   card.classList.toggle('flipped');
// }




 function playerTurn(players, drawPile, discardPile, numPhases) {
  // Draw a card from the draw pile
  const drawnCard = drawPile.pop();
  player.handCards.push(drawnCard);

//   // Example: Discard the first card in hand (you can implement your own discard logic)
  const discardCard = player.handCards.shift();
  discardPile.push(discardCard);

//   // Check if the player's phase is completed
//   if (isPhaseCompleted(player, player.currentPhase)) {
//     console.log(`${player.name} completed Phase ${player.currentPhase}`);
//     // Handle phase completion logic (e.g., move to the next phase)
//     player.currentPhase++; // Example: Move to the next phase
//   }

//   function isPhaseCompleted(player) {
//     const phaseCriteria = phase10List[player.currentPhase - 1]; // Get the criteria for the current phase
//     const phaseKeys = Object.keys(phaseCriteria);
  
//     // Check each criterion for the current phase
//     for (const key of phaseKeys) {
//       const criterion = phaseCriteria[key].toLowerCase();
//       switch (key) {
//         case 'phase1':
//           // Example: Check for 2 sets of 3
//           if (!checkSets(player.handCards, 3, 2)) {
//             return false;
//           }
//           break;
//         case 'phase2':
//           // Example: Check for 1 set of 3 + 1 run of 4
//           if (!(checkSets(player.handCards, 3, 1) && checkRun(player.handCards, 4))) {
//             return false;
//           }
//           break;
//         // Add cases for other phases (phase3, phase4, etc.) following similar patterns
//         default:
//           return true; // Default to true if the phase is not explicitly defined
//       }
//     }
  
//     return true; // All criteria for the current phase are met
//   }
  
//   // Helper function to check if the player has the required number of sets of a specific card number
//   function checkSets(cards, cardNumber, numSets) {
//     const cardCounts = countCardNumbers(cards);
//     return cardCounts[cardNumber] >= numSets;
//   }
  
//   // Helper function to check if the player has a run of consecutive card numbers
//   function checkRun(cards, length) {
//     const uniqueCardNumbers = [...new Set(cards.map(card => card.number))];
//     uniqueCardNumbers.sort((a, b) => a - b);
  
//     let consecutiveCount = 1;
//     for (let i = 0; i < uniqueCardNumbers.length - 1; i++) {
//       if (uniqueCardNumbers[i] + 1 === uniqueCardNumbers[i + 1]) {
//         consecutiveCount++;
//         if (consecutiveCount >= length) {
//           return true;
//         }
//       } else {
//         consecutiveCount = 1;
//       }
//     }
  
//     return false;
//   }
  
//   // Helper function to count the occurrences of each card number in the player's hand
//   function countCardNumbers(cards) {
//     const cardCounts = {};
//     for (const card of cards) {
//       const number = card.number;
//       cardCounts[number] = (cardCounts[number] || 0) + 1;
//     }
//     return cardCounts;
//   }
  

//   // Check if the player can go out
//   if (player.handCards.length === 0 && player.phaseCards.length === numPhases) {
//     console.log(`${player.name} went out!`);
//     // Handle going out logic (e.g., end the game or start a new hand)
//     // Example: Start a new hand by resetting player's current phase
//     player.currentPhase = 1;
//   }

//   // Proceed to the next turn, hand, or phase based on your game rules
//   nextTurn();
 }

//initializeGame();
 