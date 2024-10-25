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

       // Update the categories dropdown if a new category is added
       updateCategoryDropdown();
    
      // Persist quotes and categories in localStorage
      updateLocalStorage();

        alert("Quote added successfully!");

        // Optionally, you can immediately show the new quote
        showRandomQuote();
    } else {
        alert("Please fill in both fields.");
    }
}

// Function to update the categories dropdown dynamically based on available quotes
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
  
    // Get unique categories from quotes
    const categories = [...new Set(quotes.map(quote => quote.category))];
  
    // Clear current options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Populate dropdown with unique categories
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected category from localStorage
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
      filterQuotes(); // Apply the filter based on saved selection
    }
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");
  
    // Save selected category in localStorage
    localStorage.setItem("selectedCategory", selectedCategory);
  
    // Filter quotes by the selected category
    const filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display the first filtered quote or a message if none match
    if (filteredQuotes.length > 0) {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
    } else {
      quoteDisplay.innerHTML = "No quotes available for this category.";
    }
  }
    // Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Function to export quotes as a JSON file
  function exportQuotesToJson() {
    // Convert the quotes array to a JSON string
    const dataStr = JSON.stringify(quotes, null, 2); // Pretty-print JSON
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create Blob with JSON MIME type
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Clean up
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
  
      // Add the imported quotes to the existing array and save to localStorage
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
  
    fileReader.readAsText(event.target.files[0]); // Read uploaded file as text
  }
  
  // Function to update localStorage with quotes and categories
  function updateLocalStorage() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Load quotes from localStorage if they exist, or use default quotes
  function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  // Initial setup: Update the dropdown on page load, and load stored quotes
  window.onload = function() {
    loadQuotesFromLocalStorage(); // Load stored quotes if they exist
    populateCategories(); // Populate categories in the dropdown
    loadLastViewedQuote(); // Restore last viewed quote from sessionStorage

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("exportQuotes").addEventListener("click", exportQuotesToJson);
};
// Function to load last viewed quote from sessionStorage
function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
    if (lastViewedQuote) {
      const quote = JSON.parse(lastViewedQuote);
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = `"${quote.text}" - Category: ${quote.category}`;
    }
  }

  let quote = [];
const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint
let syncInterval;

// Fetch quotes from server
function fetchQuotesFromServer() {
    fetch(serverUrl)
        .then(response => response.json())
        .then(data => {
            const newQuotes = data.map(item => ({
                text: item.body,
                category: item.title
            }));

            // Conflict resolution: prefer server quotes
            newQuotes.forEach(newQuote => {
                const existingQuoteIndex = quotes.findIndex(q => q.text === newQuote.text);
                if (existingQuoteIndex === -1) {
                    quotes.push(newQuote);
                } else {
                    // Notify user of conflict resolution
                    notifyUser(`Conflict resolved: "${newQuote.text}" was updated.`);
                    quotes[existingQuoteIndex] = newQuote; // Update existing quote with server data
                }
            });

            localStorage.setItem('quotes', JSON.stringify(quotes));
        })
        .catch(error => console.error('Error fetching quotes:', error));
}
// Adding a new quote and syncing it to "server"
async function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  
    const newQuote = {
      id: Date.now(), // Unique ID
      text: newQuoteText,
      category: newQuoteCategory,
    };
  
    localQuotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
  
    // Simulate a POST to the server
    await simulateServerPost(newQuote);
    displayQuotes(localQuotes);
  }
  
  // Function to simulate a server POST request
  async function simulateServerPost(quote) {
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("Quote added to server:", quote);
      }
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
  }
  
// Display a random quote
function displayQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = quotes[randomIndex] ? quotes[randomIndex].text : 'No quotes available.';
}

// Add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        localStorage.setItem('quotes', JSON.stringify(quotes));
        displayQuote();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    }
}

// Notify user of updates
function notifyUser(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    setTimeout(() => {
        notification.textContent = '';
    }, 5000);
}

// Sync quotes periodically
function syncQuotes() {
    fetchQuotesFromServer();
}

// Export quotes as JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            quotes = JSON.parse(e.target.result);
            localStorage.setItem('quotes', JSON.stringify(quotes));
            displayQuote();
        };
        reader.readAsText(file);
    }
}

// Start periodic syncing every 10 seconds
syncInterval = setInterval(syncQuotes, 10000);

// Initial fetch from local storage or server
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
} else {
    fetchQuotesFromServer(); // Fetch from server if no quotes in local storage
}