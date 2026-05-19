const rockElem = document.querySelector(".js-rock-btn");
const paperElem = document.querySelector(".js-paper-btn");
const scissorsElem = document.querySelector(".js-scissors-btn");
const autoElem = document.querySelector(".js-auto-btn");
const resetElem = document.querySelector(".js-reset-btn");
const scoreElem = document.querySelector(".js-score-div");
const resultElem = document.querySelector(".js-result-div");
const statusElem = document.querySelector(".js-status-div");
let scoreObj = JSON.parse(localStorage.getItem("rps")) || {
  user: 0,
  computer: 0,
  tie: 0,
};
let autoStatus = false;
let interval1;
console.log(JSON.parse(localStorage.getItem("rps")));

rockElem.addEventListener("click", () => {
  play("rock", compPick());
  console.log(JSON.parse(localStorage.getItem("rps")));
});

paperElem.addEventListener("click", () => {
  play("paper", compPick());
  console.log(JSON.parse(localStorage.getItem("rps")));
});

scissorsElem.addEventListener("click", () => {
  play("scissors", compPick());
  console.log(JSON.parse(localStorage.getItem("rps")));
});

resetElem.addEventListener("click", () => {
  localStorage.removeItem("rps");
  assignScore(0, 0, 0);
  console.log(JSON.parse(localStorage.getItem("rps")));
  scoreObj = {
    user: 0,
    computer: 0,
    tie: 0,
  };
});

autoElem.addEventListener("click", () => {
  switch (autoElem.innerHTML) {
    case "Auto Play":
      autoElem.innerHTML = "Stop";
      break;
    case "Stop":
      autoElem.innerHTML = "Auto Play";
      break;
  }

  if (!autoStatus) {
    interval1 = setInterval(() => {
      play(compPick(), compPick());
    }, 1000);
    autoStatus = true;
  } else {
    clearInterval(interval1);
    autoStatus = false;
  }
});

function compPick() {
  const randomNum = Math.random();
  let computerChoice;

  if (randomNum > 0 && randomNum <= 1 / 3) {
    computerChoice = "rock";
  } else if (randomNum > 0 && randomNum <= 2 / 3) {
    computerChoice = "paper";
  } else if (randomNum > 0 && randomNum <= 3 / 3) {
    computerChoice = "scissors";
  }

  return computerChoice;
}

function play(userPick, computerPick) {
  let result;

  if (userPick === "rock") {
    switch (computerPick) {
      case "rock":
        result = "tie";
        break;
      case "paper":
        result = "lose";
        break;
      case "scissors":
        result = "win";
        break;
    }
  }
  if (userPick === "paper") {
    switch (computerPick) {
      case "rock":
        result = "win";
        break;
      case "paper":
        result = "tie";
        break;
      case "scissors":
        result = "lose";
        break;
    }
  }
  if (userPick === "scissors") {
    switch (computerPick) {
      case "rock":
        result = "lose";
        break;
      case "paper":
        result = "win";
        break;
      case "scissors":
        result = "tie";
        break;
    }
  }

  displayResult(userPick, computerPick, result);
  setScore(result);
}

function displayResult(userPick, computerPick, result) {
  resultElem.innerHTML = `
     <div class="fighters">
      <p>User:</p>
      <img src="images/${userPick}.png">
     </div>

     <div class="fighters">
      <img src="images/${computerPick}.png">
      <p>: Computer</p>
      
     </div>
    `;
}

function setScore(result) {
  const wordUpper = result.charAt(0).toUpperCase() + result.slice(1);
  let color;
  switch (result) {
    case "win":
      scoreObj.user++;
      color = "green";

      break;
    case "lose":
      scoreObj.computer++;
      color = "red";
      break;
    case "tie":
      scoreObj.tie++;
      color = "orange";
      break;
  }

  assignScore(scoreObj.user, scoreObj.computer, scoreObj.tie);

  statusElem.innerHTML = `
    <p class="status-p"
       style="
        background-color: ${color};
        padding: 10px 0px;
        border-radius: 8px;
       
       "
    
    
    >${wordUpper}</p>
    `;

  localStorage.setItem("rps", JSON.stringify(scoreObj));
}

function assignScore(user, computer, tie) {
  scoreElem.innerHTML = `
    <span>User: ${user}</span> 
    <span>Computer: ${computer}</span>
    <span>Tie: ${tie}</span>
    `;
}
