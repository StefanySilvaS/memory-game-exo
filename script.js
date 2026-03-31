const gameBoard = document.querySelector('.game-board');
const restartBtn = document.getElementById('restart');
const movesDisplay = document.getElementById('moves');

const cardsArray = [
  'baek.png', 'chan.png', 'd.o.png', 'kai.png',
  'sehun.png', 'suho.png', 'chen.png', 'lay.png',
  'luhan.png', 'tao.png', 'kris.png', 'exo.png',
  'baek.png', 'chan.png', 'd.o.png', 'kai.png',
  'sehun.png', 'suho.png', 'chen.png', 'lay.png',
  'luhan.png', 'tao.png', 'kris.png', 'exo.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cardsArray.length / 2;
let moves = 0;

function createBoard() {
  gameBoard.innerHTML = '';
  matchedPairs = 0;
  moves = 0;
  movesDisplay.textContent = 'Jogadas: 0';
  restartBtn.style.display = 'none';

  const shuffledCards = [...cardsArray].sort(() => 0.5 - Math.random());

  shuffledCards.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;

    const img = document.createElement('img');
    img.src = 'assets/images/back.png';
    img.alt = 'Carta';

    card.appendChild(img);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  const img = this.querySelector('img');
  img.src = `assets/images/${this.dataset.image}`;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesDisplay.textContent = `Jogadas: ${moves}`;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;

    if (matchedPairs === totalPairs) {
      restartBtn.style.display = 'block';
    }

    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.querySelector('img').src = 'assets/images/back.png';
      secondCard.querySelector('img').src = 'assets/images/back.png';
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

restartBtn.addEventListener('click', createBoard);

createBoard();
