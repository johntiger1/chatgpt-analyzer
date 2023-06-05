

console.log('yo this is running ne wlistenr')

// Here, we will add the listener to the button.

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeMe') {

      var divs = document.querySelectorAll("div.group:nth-child(2n+1)");
      console.log('yo this is running')

  
      // Extract the text from the message elements
      const messages = Array.from(divs).map((element) => element.childNodes[0].childNodes[1].textContent);
  
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

