browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze') {
    // Select all <p> elements within divs with the 'markdown' and 'prose' classes
    const messageElements = document.querySelectorAll('.markdown.prose p');

    // Extract the text from the message elements
    const messages = Array.from(messageElements).map((element) => element.textContent);

    // Combine all messages into a single string and split it into words
    const allWords = messages.join(' ').split(/\s+/);

    // Calculate word frequency
    const wordFrequency = allWords.reduce((acc, word) => {
      word = word.toLowerCase();
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    // Send the word frequency to the popup script
    sendResponse({ wordFrequency });
  }

  // Required to use sendResponse asynchronously
  return true;
});