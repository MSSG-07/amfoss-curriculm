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
