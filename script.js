// I'm writing this from my desktop pc
let goalWordCount = 250; // Global variable to store the goal word count
let plantLevel = 0; // Starting plant level, just a little seed :)
let goalReached = false; // Track if the goal has been reached

function clearText() {
    const editor = document.getElementById("editor");
    editor.innerHTML = ""; // Clears the content of the editor
}

// Show word count
document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const wordCountDisplay = document.getElementById("wordCounter");
    const startWritingBtn = document.getElementById("startWritingBtn");

    // Initially hide the word count
    wordCountDisplay.style.display = "none";

    // Initialize plant level display
    document.getElementById("plantLevel").innerText = `Plant Level: ${plantLevel}`;

    // Add click event listener to the "Start Writing" button
    startWritingBtn.addEventListener("click", () => {
        // Show the word count when "Start Writing" is pressed
        wordCountDisplay.style.display = "block";
        editor.focus();
    });

    // Add an input event listener to the editor
    editor.addEventListener("input", updateWordCount);
});

// Goal popup when the page loads
window.onload = function () {
    const modal = document.getElementById("setGoal");
    modal.style.display = "flex";
};

// Function to update the slider value display
function updateSliderValue(value) {
    document.getElementById("sliderValue").innerText = value;

    // Update the slider's track color
    const slider = document.getElementById("goalSlider");
    const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, green ${percentage}%, #d3d3d3 ${percentage}%)`;
}

// Function to set the goal word count and hide popup
function setGoal() {
    const sliderValue = document.getElementById("goalSlider").value;
    goalWordCount = parseInt(sliderValue, 10);

    // Hide the modal
    document.getElementById("setGoal").style.display = "none";

    // Update word count display to reflect the goal
    updateWordCount();
}

function countWords() {
    const editor = document.getElementById("editor");
    const text = editor.textContent.trim(); // Gets text content from editor
    const words = text ? text.split(/\s+/) : []; // Split text by whitespace
    const wordCount = words.filter(word => word.length > 0).length; // Count non-empty words
    const remainingWords = goalWordCount > 0 ? goalWordCount - wordCount : 0;
    return { wordCount, remainingWords };
}

function updateWordCount() {
    const { wordCount, remainingWords } = countWords();

    // Update the separate word count display
    document.getElementById("liveWordCount").innerText = `Words: ${wordCount}`;

    // Update the goal word count display
    document.getElementById("wordCount").innerText = 
        `Words Remaining: ${remainingWords >= 0 ? remainingWords : 0}`;

    // Increase plant level only once when the goal is reached
    if (remainingWords === 0 && !goalReached) {
        plantLevel += 1;
        document.getElementById("plantLevel").innerText = `Plant Level: ${plantLevel}`;
        goalReached = true; // Mark the goal as reached
    }
}

// Event listener for real-time updates
document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    
    // Add an input event listener to the editor
    editor.addEventListener("input", updateWordCount);
});
