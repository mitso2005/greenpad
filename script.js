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

function updateWordCount() {
    const editor = document.getElementById("editor");
    const text = editor.innerText.trim(); // Gets text contence from editor
    const words = text ? text.split(/\s+/) : []; // Split text by whitespace
    const wordCount = words.filter(word => word.length > 0).length; // Count non-empty words
    document.getElementById("wordCount").innerText = 300 - wordCount; // Update counter
}