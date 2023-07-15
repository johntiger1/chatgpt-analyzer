console.log('aqweq adding event listener')


// Add an event listener to the element with the ID 'analyzeButton' that triggers when the button is clicked.
// The logic for the "analyze" action is held in content.js. 
// document.getElementById('analyzeButton').addEventListener('click', () => {
//   browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//     browser.tabs.sendMessage(
//       tabs[0].id,
//       { action: 'analyze' }
//     ).then((response) => {
//       const sortedWordFrequency = Object.entries(response.wordFrequency).sort((a, b) => b[1] - a[1]);
//       const resultsElement = document.getElementById('results');
//       resultsElement.innerHTML = '';
//       // this is populating the popup html dynamically
//       for (const [word, count] of sortedWordFrequency) {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${word}: ${count}`;
//         resultsElement.appendChild(listItem);
//       }
//     });
//   });
// });

// // Logic for analyzeMe fucntion in add.js 
// document.getElementById('analyzeMeButton').addEventListener('click', () => {
//   browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//     browser.tabs.sendMessage(
//       tabs[0].id,
//       { action: 'analyzeMe' }
//     ).then((response) => {
//       const sortedWordFrequency = Object.entries(response.wordFrequency).sort((a, b) => b[1] - a[1]);
//       const resultsElement = document.getElementById('results');
//       resultsElement.innerHTML = '';
//       // this is populating the popup html dynamically
//       for (const [word, count] of sortedWordFrequency) {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${word}: ${count}`;
//         resultsElement.appendChild(listItem);
//       }
//     });
//   });
// });

// glue a button to the wordcloud
// document.getElementById('wordcloud-button').addEventListener('click', () => 


// {
//   browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//     browser.tabs.sendMessage(
//       tabs[0].id,
//       { action: 'analyze' }
//     ).then((response) => {
//       const sortedWordFrequency = Object.entries(response.wordFrequency).sort((a, b) => b[1] - a[1]);
//       const words = sortedWordFrequency.map(([text, size]) => {
//         return { text, size };
//       });

//        // Dimensions
// const width = 500;
// const height = 500;

// // Word cloud layout
// const layout = d3.layout.cloud()
//   .size([width, height])
//   .words(words)
//   .padding(5)
//   .rotate(() => Math.floor(Math.random() * 2) * 90)
//   .fontSize(d => d.size)
//   .on('end', draw);

// layout.start();

// // Function to draw the word cloud
// function draw(words) {
//   const svg = d3.select('#word-cloud')
//     .append('svg')
//     .attr('width', layout.size()[0])
//     .attr('height', layout.size()[1])
//     .append('g')
//     .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

//   const text = svg.selectAll('text')
//     .data(words)
//     .enter()
//     .append('text')
//     .style('font-size', d => `${d.size}px`)
//     .style('fill', (d, i) => d3.schemeCategory10[i % 10])
//     .attr('text-anchor', 'middle')
//     .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
//     .text(d => d.text);
// }

  
//   });

//     });
 




// });


browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "progessBarUpdate") {

    // Change the text of the element
    const progressBar = document.getElementById('progress-bar');
    const progressBarCurrLength = document.getElementById('current-iteration');
    const progressStatusText = document.getElementById('current-status');


    progressBar.style.width = request.width;
    progressBarCurrLength.textContent = request.iter;
    progressStatusText.textContent = "Currently processing..."



  }

  else if  (request.action=="initializeProgressBar") {
    const progressBarTotalLength = document.getElementById('total-length');
    const numberOfChats = document.getElementById('number-of-chats');
    const progressStatusText = document.getElementById('current-status');

    progressBarTotalLength.textContent = request.length
    numberOfChats.textContent = "Identified " + request.length + " chats!"
    progressStatusText.textContent = "Beginning processing..."

  }

  else if  (request.action=="finishProgress") {
    const progressStatusText = document.getElementById('current-status');
    progressStatusText.textContent = "Finished processing..."
  }

  else if (request.action=="wordCounterUpdate"){
    console.log('updating the word log')
    let wordList = document.getElementById('wordList');

// Clear any existing entries
wordList.innerHTML = '';

// Add a new li element for each entry in globalWordFrequency
for (let [word, frequency] of request.globalWordFrequency) {
  let listItem = document.createElement('li');
  listItem.textContent = `${word}: ${frequency}`;
  wordList.appendChild(listItem);
}

  }
});

document.getElementById('start-button').addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {action: "processBlocks"});
  });
});