/*
 * Create a list that holds all of your cards
 */

// create variable that can call the UL holding all cards
const deck = document.querySelector('.deck');
// variable to store toggled cards in an array
let toggledCards = [];
// variable to keep count of the number of moves
let moves = 0;
// variable to keep the clock zeroed
let clockStopped = true;
// variable to set timer at 0
let timer = 0;
// variable to control interval and reset of the timer
let clockID;
// variable to declare number of pairs
const pairs = 8;
// variable that keeps track of matched pairs to compare with pairs variable
let matches = 0;

//   Display the cards on the page
//   - shuffle the list of cards using the provided "shuffle" method below
//   - loop through each card and create its HTML
//   - add each card's HTML to the page

function shuffleDeck() {
  const shuffleCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffledDeck = shuffle(shuffleCards);
  for (card of shuffledDeck) {
    deck.appendChild(card);
  }
}
shuffleDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 // set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (validateClick(clickTarget)) {
    if(clockStopped) {
      startTimer();
      clockStopped = false;
    }
    toggleCard(clickTarget);
    addCard(clickTarget);
    if (toggledCards.length == 2) {
      checkForMatch(clickTarget);
      moveCount();
      score();
      }
    }
  });

function validateClick(clickTarget) {
  return (
      clickTarget.classList.contains('card')
      && !clickTarget.classList.contains('match')
      && toggledCards.length < 2
      && !toggledCards.includes(clickTarget)
    );
}

//   - display the card's symbol (put this functionality in another function that you call from this one)
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

//   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

function addCard(clickTarget) {
  toggledCards.push(clickTarget);
}

//   - if the list already has another card, check to see if the two cards match
function checkForMatch() {
  return (toggledCards[0].firstElementChild.className
    === toggledCards[1].firstElementChild.className) ? matched() : noMatch();

};

// if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matched() {
  toggledCards[0].classList.toggle('match');
  toggledCards[1].classList.toggle('match');
  toggledCards = [];
  matches++;
  console.log(matches);
  if(matches === pairs) {
    gameOver();
  }

}

// if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function noMatch() {
  setTimeout(() => {
  toggleCard(toggledCards[0]);
  toggleCard(toggledCards[1]);
  toggledCards = [];
  }, 1000);
}

// timer functionality
function startTimer() {
  clockID = setInterval(() => {
    timer++;
    timerDisplay();
  },1000);
}

function stopTimer() {
  clearInterval(clockID);
}

function timerDisplay() {
  const clock = document.querySelector('.timer');
  const seconds = Math.floor(timer % 60);
  const minutes = Math.floor(timer / 60);
  return (seconds < 10) ? clock.innerHTML = `${minutes}:0${seconds}`
  : clock.innerHTML = `${minutes}:${seconds}`;
}

// increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function moveCount() {
  moves++;
  const showMoves = document.querySelector('.moves');
  showMoves.innerHTML = moves;
}



// decrement the number of stars based on total Moves
function starCount() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
};

//keep track of moves to remove stars
function score() {
  if (moves === 16 || moves === 24) {
    starCount();
  }
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('hide');
}



function gameStats() {
  const totalTime = document.querySelector('.final-time');
  const timerTotal = document.querySelector('.timer').innerHTML;
  const totalMoves = document.querySelector('.final-moves');
  const totalStars = document.querySelector('.final-stars');
  const collectStars = grabStars();


  totalTime.innerHTML = `Time = ${timerTotal}`;
  totalMoves.innerHTML = `Moves = ${moves}`;
  totalStars.innerHTML = `Stars = ${collectStars}`;

  function grabStars() {
    const stars = document.querySelectorAll('.stars li');
    starTotal = 0;
    for (star of stars) {
      if (star.style.display !== 'none') {
        starTotal++;
      }
    }
    return starTotal;
  }

}

function modalClose() {
  const close = document.querySelector('.modal-close');
  toggleModal();
}

function gameOver() {
  stopTimer();
  gameStats();
  toggleModal();
}

function reset() {
  const replay = document.querySelectorAll('.restart');
  timer = 0;
  resetMoves();
  resetStars();
  stopTimer();
  clockStopped = true;
  timerDisplay();
  resetDeck();
  shuffleDeck();
}

function resetStars() {
  starTotal = 0;
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    star.style.display = 'inline';
  }
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetDeck() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
