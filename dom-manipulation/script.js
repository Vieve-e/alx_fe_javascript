// script.js

// Array to hold quotes
const quotes = [
    { text: "The magic you are looking for is in the hard work you are avoiding.", category: "Motivation" },
    { text: "Life takes unexpected turns, you need to be spontaneous.", category: "Life" },
    { text: "Life at the end of the day is what you make it.", category: "Life" },
    { text: "Just because its taking time, doesnt mean its not happening.", category: "Motivation" },
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong></p><p>Category: ${randomQuote.category}</p>`;
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formHTML = `
        <h3>Add a New Quote</h3>
        <input type="text" id="quoteText" placeholder="Enter quote text" required>
        <input type="text" id="quoteCategory" placeholder="Enter quote category" required>
        <button id="submitQuote">Submit Quote</button>
    `;
    document.getElementById("addQuoteForm").innerHTML = formHTML;

    // Add event listener to submit button
    document.getElementById("submitQuote").addEventListener("click", addNewQuote);
}

// Function to add a new quote
function addNewQuote() {
    const newQuoteText = document.getElementById("quoteText").value;
    const newQuoteCategory = document.getElementById("quoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        alert("Quote added successfully!");
        document.getElementById("quoteText").value = '';
        document.getElementById("quoteCategory").value = '';
    } else {
        alert("Please fill in both fields.");
    }
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", createAddQuoteForm);

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Clear previous quote display
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ''; // Clear existing content

    // Create elements for new quote display
    const quoteText = document.createElement("p");
    const quoteCategory = document.createElement("p");

    // Set the text content
    quoteText.innerHTML = `<strong>${randomQuote.text}</strong>`;
    quoteCategory.textContent = `Category: ${randomQuote.category}`;

    // Append the new elements to the display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';

        alert("Quote added successfully!");

        // Optionally, you can immediately show the new quote
        showRandomQuote();
    } else {
        alert("Please fill in both fields.");
    }
}

// Event listener for the new quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);