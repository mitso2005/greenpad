let goalWordCount = 250; // Global variable to store the goal word count

function clearText() {
    const editor = document.getElementById("editor");
    editor.innerHTML = ""; // Clears the content of the editor
}

document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const wordCountDisplay = document.getElementById("wordCounter");
    const startWritingBtn = document.getElementById("startWritingBtn");

    // Initially hide the word count
    wordCountDisplay.style.display = "none";

    // Add click event listener to the "Start Writing" button
    startWritingBtn.addEventListener("click", () => {
        // Show the word count when "Start Writing" is pressed
        wordCountDisplay.style.display = "block";
        
        // Focus on the editor
        editor.focus();
    });

    // Add an input event listener to the editor
    editor.addEventListener("input", updateWordCount);
});

// Goal popup when  the page loads
window.onload = function () {
    const modal = document.getElementById("setGoal");
    modal.style.display = "flex";
}

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

    //
    const modal = document.getElementById("setGoal");

    // Update word count display to reflect the goal
    updateWordCount();
}

function updateWordCount() {
    const editor = document.getElementById("editor");
    const text = editor.innerText.trim(); // Gets text contence from editor
    const words = text ? text.split(/\s+/) : []; // Split text by whitespace
    const wordCount = words.filter(word => word.length > 0).length; // Count non-empty words

    // Update the word count display
    const remainingWords = goalWordCount > 0 ? goalWordCount - wordCount : 0;
    document.getElementById("wordCount").innerText = 
        `Words Remaining: ${remainingWords >= 0 ? remainingWords : 0}`;
}
