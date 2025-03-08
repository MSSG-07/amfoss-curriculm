## ASSIGNMENT
***Disable the input event listener on completion, and re-enable it when the button is clicked and disable the textbox when the player completes the quote.***
```javascript
document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = new Date().getTime();
    typedValueElement.disabled = false;
  });
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
      typedValueElement.disabled = true;
     } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
```
***Display a modal dialog box with the success message.***
```html
<!--This code snippet is added below the start button-->
<div class="popup" id="popup">
    <img src="congrats.png" alt="Congrats">
    <h2>CONGRATULATIONS!</h2>
    <button id="closeBtn">Type Again!!</button>
```
```css
.popup{
  width: 400px;
  background-color: antiquewhite;
  position: absolute;
  border-radius: 6px;
  top:0;
  left:50%;
  text-align: center;
  transform: translate(-50%,-50%) scale(0.1);
  padding: 0 30px 30px;
  color: rgb(23, 63, 97);
  visibility: hidden;
  transition: transform 0.4s, top 0.4s;
  }
.open-popup{
  visibility: visible;
  top: 50%;
  transform: translate(-50%,-50%) scale(1);
}

.popup img{
  width: 100px;
  border-radius: 50%;
  margin-top: -50px;
  box-shadow: 0 2px 5px rgba(0,0, 0, 0.2) ;
  }

.popup h2{
  font-size: 38px;
  font-weight: 500;
  margin: 30px 0 10px
}
.popup button{
  width:100% ;
  margin-top: 50px;
  padding: 10px 0;
  background: antiquewhite;
  color: #fff;
  border: 0;
  outline: none;
  font-size: 18px;
}
.popup button:hover {
  background-color: darkblue;
}
```
```javascript
document.addEventListener('DOMContentLoaded', updateHighScoreDisplay);
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');

  closeBtn.addEventListener('click', () => {
      popup.classList.remove("open-popup");
      popup.style.visibility = "hidden";
      popup.style.transform = "translate(-50%, -50%) scale(0.1)";
      typedValueElement.value = '';
  });
// Update the typedValueElement.addEventListener
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
      typedValueElement.disabled = true;
      
      popup.style.visibility = "visible";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
      popup.classList.add("open-popup");
      } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
```
***Store high scores using localStorage***
```html
<body>
  <h1>Typing game!</h1>
  <p>Practice your typing skills with a quote from Sherlock Holmes. Click **start** to begin!</p>
  <p id="quote"></p> 
  <p id="message"></p>
  <p id="high-score">High Score: -- milli sec</p> 
    <input type="text" aria-label="current word" id="typed-value" /> 
    <button type="button" id="start">Start</button> 
    <div class="popup" id="popup">
    <img src="congrats.png" alt="Congrats">
    <h2>CONGRATULATIONS!</h2>
    <button id="closeBtn">Type Again!!</button>
</div>
</body>
```
```js
let highScore = localStorage.getItem('highScore') ? parseFloat(localStorage.getItem('highScore')) : Infinity;
function updateHighScoreDisplay() {
  const highScoreElement = document.getElementById('high-score'); 
  if (highScoreElement) {  
      if (highScore !== Infinity) {
          highScoreElement.innerText = `High Score: ${highScore.toFixed(2)} milli sec`;
      } else {
          highScoreElement.innerText = `High Score: -- sec`;
      }
  } else {
      console.error("ERROR: High score element not found!");
  }
}
// Update the typedValueElement.addEventListener
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
      typedValueElement.disabled = true;
      
      popup.style.visibility = "visible";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
      popup.classList.add("open-popup");

      if (elapsedTime < highScore) {
        highScore = elapsedTime;
        localStorage.setItem('highScore', highScore.toFixed(2)); 
        updateHighScoreDisplay(); 
        messageElement.innerText += ` New High Score!`;
    }

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });

```
## CHALLENGE
***A simple keyboard game: Rock Paper Scissors.***
This game uses the event listener to interact with the user using keyboard and click.The score of the game is stored in local storage with can be cleared later.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Paper Scissors</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Rock Paper Scissors</h1>

    <div class="choices">
      <button class="choice" id="rock">🪨</button>
      <button class="choice" id="paper">📃</button>
      <button class="choice" id="scissors">✂️</button>
    </div>

    <div class="score-board">
      <div class="score">
        <p id="user-score">0</p>
        <p>You</p>
      </div>
      <div class="score">
        <p id="comp-score">0</p>
        <p>Comp</p>
      </div>
    </div>

    <div class="msg-container">
      <p id="msg">Play your move</p>
    </div>
    <button id="reset">Reset Game</button>
    <script src="script.js" defer></script>
  </body>
</html>
```
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}
h1 {
    background: #081b31;
    color: #fff;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.choices {
    display: flex;
    justify-content: center;
    margin: 30px 0;
}
.choice {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    background: #fff;
    border: 3px solid #081b31;
    margin: 10px;
    cursor: pointer;
    transition: 0.3s;
}
.choice:hover {
    background: #081b31;
    color: #ffcc00;
    border-color: #ffcc00;
}
.score-board {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
.score {
    margin: 0 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #081b31;
    text-align: center;
}
#user-score, #comp-score {
    font-size: 2rem;
    color: #ff4500;
}
.msg-container {
    margin: 20px auto;
    font-size: 1.5rem;
    font-weight: bold;
    color: #081b31;
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    text-align: center;
    width: fit-content;
}
#reset {
    display: block;
    margin: 20px auto; 
    padding: 12px 20px;
    font-size: 1rem;
    background-color: #ff4c4c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}
#reset:hover {
    background-color: #cc0000;
}
```
```javascript
const choices = ["rock", "paper", "scissors"];
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
const msg = document.getElementById("msg");
let userPoints = localStorage.getItem("userScore") ? parseInt(localStorage.getItem("userScore")) : 0;
let compPoints = localStorage.getItem("compScore") ? parseInt(localStorage.getItem("compScore")) : 0;
userScore.textContent = userPoints;
compScore.textContent = compPoints;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(user, computer) {
    if (user === computer) return "Draw!";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getWinner(userChoice, computerChoice);

    msg.textContent = `You: ${userChoice} | Computer: ${computerChoice} - ${result}`;

    if (result === "You win!") {
        userPoints++;
        userScore.textContent = userPoints;
        localStorage.setItem("userScore", userPoints);
    } else if (result === "Computer wins!") {
        compPoints++;
        compScore.textContent = compPoints;
        localStorage.setItem("compScore", compPoints);
    }
}
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r") playGame("rock");
    else if (event.key.toLowerCase() === "p") playGame("paper");
    else if (event.key.toLowerCase() === "s") playGame("scissors");
});
document.getElementById("reset").addEventListener("click", () => {
    userPoints = 0;
    compPoints = 0;
    userScore.textContent = userPoints;
    compScore.textContent = compPoints;
    localStorage.setItem("userScore", userPoints);
    localStorage.setItem("compScore", compPoints);
    msg.textContent = "Game Reset!";
});

```

