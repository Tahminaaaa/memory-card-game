document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".box");
    const timeDisplay = document.querySelector(".time");
    const scoreDisplay = document.querySelector(".score");
    const resultScreen = document.querySelector(".result");
    const resultMessage = resultScreen.querySelector("p");
    const playAgainBtn = document.querySelector(".again");

    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let startTime;
    let timer;

    const words = [
        "Haus", "Buch", "Auto", "Baum", "Hund", "Katze",
        "Haus", "Buch", "Auto", "Baum", "Hund", "Katze"
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        loadScore();
        shuffle(words);
        cards.forEach((card, index) => {
            card.querySelector(".back").textContent = words[index];
            card.addEventListener("click", flipCard);
        });
        startTime = Date.now();
        timer = setInterval(updateTime, 1000);
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flip")) {
            this.classList.add("flip");
            flippedCards.push(this);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        let [card1, card2] = flippedCards;
        let word1 = card1.querySelector(".back").textContent;
        let word2 = card2.querySelector(".back").textContent;

        if (word1 === word2) {
            matchedPairs++;
            score += 5;
            flippedCards = [];
            saveScore();
            if (matchedPairs === words.length / 2) {
                endGame();
            }
        } else {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            flippedCards = [];
            saveScore();
        }
        scoreDisplay.textContent = score;
    }

    function updateTime() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.textContent = elapsedTime;
    }

    function endGame() {
        clearInterval(timer);
        saveBestScore();
        resultScreen.style.display = "block";
        resultMessage.textContent = `You won ${score} points in ${timeDisplay.textContent} seconds`;
        playAgainBtn.addEventListener("click", resetGame);
    }

    function saveScore() {
        localStorage.setItem("currentScore", score);
    }

    function loadScore() {
        const savedScore = localStorage.getItem("currentScore");
        if (savedScore !== null) {
            score = parseInt(savedScore);
            scoreDisplay.textContent = score;
        }
    }

    function saveBestScore() {
        let bestScore = localStorage.getItem("bestScore");
        if (!bestScore || score > parseInt(bestScore)) {
            localStorage.setItem("bestScore", score);
        }
    }

    function resetGame() {
        localStorage.removeItem("currentScore");
        location.reload();
    }

    startGame();
});
