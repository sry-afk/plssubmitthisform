const gameData = [
    { image: "1", answer: "today i don't feel" },
    { image: "2", answer: "so well" },
    { image: "3", answer: "my stomach hurts" },
    { image: "4", answer: "i feel nauseous" },
    { image: "5", answer: "my head is dizzy" },
    { image: "6", answer: "could i be pregnant?" },
    { image: "7", answer: "this morning" },
    { image: "8", answer: "as i looked out of" },
    { image: "9", answer: "window i saw a bi" },
    { image: "10", answer: "bird" },
    { image: "11", answer: "fly away i wondered" },
    { image: "12", answer: "how it would feel" },
    { image: "13", answer: "to move my hands" },
    { image: "14", answer: "fast enough to fly" },
    { image: "15", answer: "this rising fever ke" },
    { image: "16", answer: "keeps me bound" },
    { image: "17", answer: "here" },
    { image: "18", answer: "on the ground" },
    { image: "19", answer: "my arm fell asleep" },
    { image: "20", answer: "i feel yo wrmth" },
    { image: "21", answer: "flushed cheek" },
    { image: "22", answer: "press on my face" },
    { image: "23", answer: "the small bumps o" },
    { image: "24", answer: "the" },
    { image: "25", answer: "hair roots of your" },
    { image: "26", answer: "skin" },
    { image: "27", answer: "the cavities aroun" },
    { image: "28", answer: "the cavities around your" },
    { image: "29", answer: "eyes which are tir" },
    { image: "30", answer: "tiredly looking at me" },
    { image: "31", answer: "but still sparking excite" },
    { image: "32", answer: "excitement" },
    { image: "33", answer: "the smell of a tree" },
    { image: "34", answer: "a flower in spring" },
    { image: "35", answer: "overwhelming you" },
    { image: "36", answer: "" },
    { image: "37", answer: "" },

];

let currentLevel = 0;
// Base path for images; will read from the HTML `data-image-base` attribute if present
let IMAGE_BASE = 'images/';

function validateLevel() {
    const inputField = document.getElementById("user-input");
    const feedback = document.getElementById("feedback");
    const imageDisplay = document.getElementById("display-image");

    // Normalize input: remove extra spaces and make lowercase
    const guess = inputField.value.toLowerCase().trim();
    const correct = gameData[currentLevel].answer.toLowerCase();

    if (guess === correct) {
        // Advance and wrap around using modulo so images loop forever
        currentLevel = (currentLevel + 1) % gameData.length;

        // Load the next level (wraps to start when reaching the end)
        imageDisplay.src = `${IMAGE_BASE}${gameData[currentLevel].image}.png`;
        inputField.value = "";

    } else {
        feedback.innerText = "are you human?";
        feedback.style.color = "#ff4444";
    }
}

// Allow pressing 'Enter' to submit
document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") validateLevel();
});

// Advance to next level without validating the answer (wraps forever)
function advanceLevel() {
    const imageDisplay = document.getElementById("display-image");
    const inputField = document.getElementById("user-input");
    const feedback = document.getElementById("feedback");

    if (!gameData.length) return;

    currentLevel = (currentLevel + 1) % gameData.length;

    if (imageDisplay) imageDisplay.src = `${IMAGE_BASE}${gameData[currentLevel].image}.png`;
    if (inputField) {
        inputField.value = "";
        inputField.focus();
    }
}

// Set image base from HTML and initial image on page load
document.addEventListener("DOMContentLoaded", function () {
    const imageDisplay = document.getElementById("display-image");
    const imageContainer = document.querySelector('.image');
    if (imageContainer && imageContainer.dataset.imageBase) {
        IMAGE_BASE = imageContainer.dataset.imageBase;
        if (!IMAGE_BASE.endsWith('/')) IMAGE_BASE += '/';
    }

    if (imageDisplay && gameData.length > 0) {
        imageDisplay.src = `${IMAGE_BASE}${gameData[currentLevel].image}.png`;
    }
});