// -------------------- MEMORY GAME LOGIC --------------------

// Love-themed emojis ❤️🌸💌
const emojis = ['❤️', '💖', '🌸', '💌', '💕', '💘', '🌹', '💞'];
let cards = [...emojis, ...emojis]; // duplicate for pairs

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const memoryGame = document.getElementById('memory-game');

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start the game
function startGame() {
  memoryGame.innerHTML = '';
  shuffle(cards).forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    memoryGame.appendChild(card);
  });
}

// Flip card logic
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check match
function checkForMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    disableCards();
    matches++;
    if (matches === emojis.length) {
      setTimeout(showFinalPage, 800);
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.style.backgroundColor = '#ffe6eb';
  secondCard.style.backgroundColor = '#ffe6eb';
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Unflip non-matching cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.innerHTML = '?';
    secondCard.innerHTML = '?';
    resetBoard();
  }, 1000);
}

// Reset
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// -------------------- PAGE NAVIGATION --------------------

// Start button → show memory game
function startSurprise() {
  document.getElementById('landing').classList.remove('active');
  document.getElementById('game').classList.add('active');
  startGame();
}

// Show final love message page
function showFinalPage() {
  document.getElementById('game').classList.remove('active');
  document.getElementById('final').classList.add('active');
}
