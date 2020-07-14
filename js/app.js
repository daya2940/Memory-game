let iconsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
  "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

iconsList = iconsList.concat(iconsList);

const cardscontainer = document.querySelector(".deck"),
  closeIcon = document.querySelector("#play-again"),
  secondsContainer = document.querySelector("#seconds"),
  minutesContainer = document.querySelector("#minutes"),
  hoursContainer = document.querySelector("#hours");
let modal = document.getElementById("popup"),
  firstClick = true;


let opencards = [],
  totalTime = 0,
  incrementer = 0,
  matchedCards = [];
//game initilisation
function init() {
  const icons = shuffle(iconsList);

  for (var i = 0; i < icons.length; i++) {

    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`
    cardscontainer.appendChild(card);
    click(card); //invoking click event


  }

}

//function containing click event
function click(card) {
  card.addEventListener("click", function () {

    const currentCard = this;
    const previousCard = opencards[0];
    //checking for openedcards
    if (opencards.length === 1) {

      card.classList.add("open", "show", "disable");
      opencards.push(this);

      comparison(currentCard, previousCard);
      // The First Click? Start the timer!
      if (firstClick) {
        startTimer();
        firstClick = false; // This will prevent the timer to start again if the user clicked on another card
      }

    } else {

      this.classList.add("open", "show", "disable");
      opencards.push(this);
    }

  });

}

//initilising the game
init();
//comparison function
function comparison(currentCard, previousCard) {


  if (currentCard.innerHTML === previousCard.innerHTML) //comparing two cards
  {

    currentCard.classList.add("match"); //applying match class
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);

    //checking if the game is over
    congrats();
    opencards = [];
  }
  //when two cards do not match
  else {
    setTimeout(function () {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      opencards = [];

    }, 500);

  }
  addMove();
}






function startTimer() {

  // Start Incrementer
  incrementer = setInterval(function () {

    // Add totalTime by 1
    totalTime += 1;

    // Convert Total Time to H:M:S
    calculateTime(totalTime);

    // Change the current time values
    secondsContainer.innerHTML = seconds;
    minutesContainer.innerHTML = minutes;
    hoursContainer.innerHTML = hours;

  }, 1000);


}

/*
 * Timer [ Calculate Time ] 
 */
function calculateTime(totalTime) {
  hours = Math.floor(totalTime / 60 / 60);
  minutes = Math.floor((totalTime / 60) % 60);
  seconds = totalTime % 60;
}

/*
 * Timer [ Stop ] 
 */
function stopTimer() {
  // Stop Timer
  clearInterval(incrementer);
}


//close modal function, so the modal can be closed and the game reset
function closeModal() {
  closeIcon.addEventListener("click", function () {
    modal.classList.remove("show");


  });
}

/**
* @description Congratulations function is created
* when all the deck have flipped paired cards
*/
function congrats() {
  if (matchedCards.length == iconsList.length) {

    document.getElementById("totalTime").innerHTML = hours + ":" + minutes + ":" + seconds;
    stopTimer();
    // a well done modal is shown
    modal.classList.add("show");
    // a varible star rating is created
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = move + 1;
    document.getElementById("star-rating").innerHTML = rate;
    closeModal();
  };
}
// play again function
function playAgain() {
  modal.classList.remove("show");

  clearHtml();
}






//restart the game

const restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
  clearHtml();

});
//this function clears the html required to clear 
function clearHtml() {
  cardscontainer.innerHTML = "";
  moveUpdate.innerHTML = 0;
  rating.innerHTML = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
  matchedCards = [];
  move = 0;
  init();

  secondsContainer.innerHTML = "00";
  minutesContainer.innerHTML = "00";
  hoursContainer.innerHTML = "00";
  hours = 0;
  minutes = 0;
  seconds = 0;
  totalTime = 0;
  incrementer = 0;
}
startTimer();


//setting moves
const moveUpdate = document.querySelector(".moves");
let move = 0;

function addMove() {
  move++;
  moveUpdate.innerHTML = move;
  starRating(); //setting rating
}
//timer



// star rating 
let rating = document.querySelector(".stars");
let rate;
function starRating() {
  rating.innerHTML = "";

  if (move <= 5) {
    rate = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>
                 `;
    rating.innerHTML = rate;
  } else if (move > 5 && move <= 15) {
    rate = ` <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`
    rating.innerHTML = rate;
  } if (move > 15) {
    rate = ` <li><i class="fa fa-star"></i></li>`
    rating.innerHTML = rate;
  }
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}