document.addEventListener("DOMContentLoaded", () => {
    let goalWordCount = 250; // Global variable to store the goal word count
    let plantLevel = 0; // Starting plant level, just a little seed :)
    let goalReached = false; // Track if the goal has been reached

    // Object stores all info from questions
    const userInputData = {
        dueDateStatus: null, // Yes or No
        dueDate: null,     // Days until the due date
        totalCount: null,     // Word count of writing
        dailyWords: null,  // Number of words per day
        goalType: null,    // Will implement later
    };

    // Safely access the elements only when the DOM is fully loaded
    const editor = document.getElementById("editor");
    const plantLevelDisplay = document.getElementById("plantLevel");
    const liveWordCountDisplay = document.getElementById("liveWordCount");


    let wordsPerDay = userInputData.totalCount / userInputData.dueDate; // Calculate words per day

    function setUserInputData(value, dataType) {
        userInputData[dataType] = value; // Use bracket notation
        console.log(`Updated ${dataType}:`, userInputData);
    }

    function nextQuestion(current, target) {
        console.log(`Navigating from question ${current} to question ${target}`);
        document.getElementById(`question${current}`).classList.remove("active");
        document.getElementById(`question${target}`).classList.add("active");
    }

    function updateSliderValue(value, valueId, sliderId) {
        document.getElementById(valueId).innerText = value;
        const slider = document.getElementById(sliderId);
        const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, green ${percentage}%, #d3d3d3 ${percentage}%)`;
    }

    // Attach event listeners dynamically
    document.querySelectorAll(".button").forEach((button) => {
        // Handle next question navigation
        if (button.dataset.next) {
            button.addEventListener("click", () => {
                const [current, target] = button.dataset.next.split(",").map(Number);
                nextQuestion(current, target);
            });
        }

        // Handle user input data
        if (button.dataset.input) {
            button.addEventListener("click", () => {
                const [value, dataType] = button.dataset.input.split(",");
                setUserInputData(value, dataType);
            });
        }
    });

    // Attach event listeners for range sliders
    document.querySelectorAll("input[type='range']").forEach((slider) => {
        slider.addEventListener("input", () => {
            updateSliderValue(slider.value, slider.id + "Value", slider.id);
        });
    });

    function clearText() {
        const editor = document.getElementById("editor");
        editor.innerHTML = ""; // Clears the content of the editor
    }

    // Show word count
    const wordCountDisplay = document.getElementById("wordCounter");
    const startWritingBtn = document.getElementById("startWritingBtn");

    // Function to set the goal word count
    function setGoal(sliderId) {
        const sliderValue = document.getElementById(sliderId).value;
        goalWordCount = parseInt(sliderValue, 10);

        // Update word count display to reflect the goal
        updateWordCount();
    }

    function countWords() {
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
    
    if (editor) {
        // Add an input event listener to the editor
        editor.addEventListener("input", updateWordCount);
    }

    if (plantLevelDisplay) {
        // Initialize plant level display
        const plantLevel = 1;
        plantLevelDisplay.innerText = `Plant Level: ${plantLevel}`;
    }

    if (liveWordCountDisplay) {
        // Initialize word count display
        liveWordCountDisplay.innerText = `Words: 0`;
    }
});
