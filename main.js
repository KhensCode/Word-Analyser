// Word class that will classify words based on length and content
class Word {
  constructor(text) {
    this.text = text;
    this.length = text.length;
    this.type = this.classify();
  }

  // Classify word by length
  classify() {
    if (this.length <= 3) return 'short';
    if (this.length <= 6) return 'medium';
    return 'long';
  }
}

// Select DOM elements
const input = document.getElementById('searchInput');
const textarea = document.getElementById('content');
const resultDiv = document.getElementById('result');

// Function to handle text processing and word classification
function processText() {
  // Get content from the textarea
  const originalText = textarea.value;

  // Split the paragraph into words
  const words = originalText.split(" ");

  // Create an array of Word objects
  const wordObjects = words.map(word => new Word(word));

  // Filter out words that are short, medium, or long based on user input
  const searchTerm = input.value.trim().toLowerCase();
  
  // Map the word objects to HTML with classifications
  const highlightedText = wordObjects
    .map(word => {
      // If the word matches the search term, highlight it
      const highlightedWord = word.text.toLowerCase().includes(searchTerm)
        ? `<span class="highlight">${word.text}</span>`
        : `<span class="${word.type}">${word.text}</span>`;

      return highlightedWord;
    })
    .join(" ");

  // Display the processed text with highlights and classifications
  resultDiv.innerHTML = highlightedText;
}

// Event listener for user input changes
input.addEventListener("keyup", processText);
textarea.addEventListener("input", processText);

// Initial call to display content
processText();
