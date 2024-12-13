let goalWordCount = 0; // Global variable to store the goal word count

function clearText() {
    const editor = document.getElementById("editor");
    editor.innerHTML = ""; // Clears the content of the editor
}

document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");

    // Add an input event listener to the editor
    editor.addEventListener("input", updateWordCount);

    // Initial word count
    updateWordCount();
});

// Goal popup when  the page loads
window.onload = function () {
    const modal = document.getElementById("setGoal");
    modal.style.display = "flex";
}

// Set goal word count and hide popup
function setGoal() {
    const goalInput = document.getElementById("goalInput").value;
    if (goalInput && !isNaN(goalInput) && goalInput > 0) {
        goalWordCount = parseInt(goalInput, 10); // Store the goal word count in the global variable

        // Hide the modal
        document.getElementById("setGoal").style.display = "none";

        // Update word count display to reflect the goal
        updateWordCount();
    } else {
        alert("Please enter a valid positive number.");
    }
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
