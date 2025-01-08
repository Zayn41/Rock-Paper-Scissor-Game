let userScore = localStorage.getItem("userScore") ? parseInt(localStorage.getItem("userScore")) : 0;
let compScore = localStorage.getItem("compScore") ? parseInt(localStorage.getItem("compScore")) : 0;
const savedMessage = localStorage.getItem("gameMessage") || "Play your move";
const savedMessageBg = localStorage.getItem("messageBgColor") || "";

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resetButton = document.querySelector("#reset-btn");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Initialize Scores and Message on Page Load
userScorePara.innerText = userScore;
compScorePara.innerText = compScore;
msg.textContent = savedMessage;
msg.style.backgroundColor = savedMessageBg;

const gentCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const radomIdx = Math.floor(Math.random() * 3);
    return options[radomIdx];
};

const drawGame = () => {
    msg.innerText = "Game was Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
    // Save message and background color to localStorage
    localStorage.setItem("gameMessage", msg.innerText);
    localStorage.setItem("messageBgColor", msg.style.backgroundColor);
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        localStorage.setItem("userScore", userScore); // Save user score
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        localStorage.setItem("compScore", compScore); // Save computer score
        compScorePara.innerText = compScore;
        msg.innerText = `You lose. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    // Save message and background color to localStorage
    localStorage.setItem("gameMessage", msg.innerText);
    localStorage.setItem("messageBgColor", msg.style.backgroundColor);
};

const playGame = (userChoice) => {
    const compChoice = gentCompChoice();

    // Highlight User's Choice
    const userChoiceElement = document.getElementById(userChoice);
    userChoiceElement.classList.add("highlight");

    // Highlight Computer's Choice
    const compChoiceElement = document.getElementById(compChoice);
    compChoiceElement.classList.add("comp-choice");

    setTimeout(() => {
        // Remove Highlights After 3 Second
        userChoiceElement.classList.remove("highlight");
        compChoiceElement.classList.remove("comp-choice");
    }, 3000);

    // Check Game Result
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetButton.addEventListener("click", () => {
    // Reset scores
    userScore = 0;
    compScore = 0;

    // Update the UI
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;

    // Reset the message
    msg.textContent = "Play your move";
    msg.style.backgroundColor = "";

    // Update localStorage
    localStorage.setItem("userScore", userScore); // Reset user score in storage
    localStorage.setItem("compScore", compScore); // Reset computer score in storage
    localStorage.setItem("gameMessage", "Play your move"); // Reset message in storage
    localStorage.setItem("messageBgColor", ""); // Reset background color in storage
});
