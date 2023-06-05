console.log('aqweq adding event listener')
document.getElementById('analyzeButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(
      tabs[0].id,
      { action: 'analyze' }
    ).then((response) => {
      const sortedWordFrequency = Object.entries(response.wordFrequency).sort((a, b) => b[1] - a[1]);
      const resultsElement = document.getElementById('results');
      resultsElement.innerHTML = '';
      // this is populating the popup html dynamically
      for (const [word, count] of sortedWordFrequency) {
        const listItem = document.createElement('li');
        listItem.textContent = `${word}: ${count}`;
        resultsElement.appendChild(listItem);
      }
    });
  });
});