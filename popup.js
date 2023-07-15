console.log('aqweq adding event listener')


function draw(words) {
  // Clear any existing word cloud
  d3.select('#word-cloud').html('');

  const svg = d3.select('#word-cloud')
    .append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

  const text = svg.selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', d => `${d.size}px`)
    .style('fill', (d, i) => d3.schemeCategory10[i % 10])
    .attr('text-anchor', 'middle')
    .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
    .text(d => d.text);
}


let layout;

// Word cloud layout
const width = 500;
const height = 500;

layout = d3.layout.cloud()
  .size([width, height])
  .padding(5)
  .rotate(() => Math.floor(Math.random() * 2) * 90)
  .fontSize(d => d.size)
  .on('end', draw);

layout.start();

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
    progressStatusText.textContent = "Finished!"
  }

  else if (request.action=="wordCounterUpdate"){
    console.log('updating the word log');
    let wordList = document.getElementById('wordList');
  
    // Clear any existing entries
    wordList.innerHTML = '';
    
    
    // Add a new li element for each entry in globalWordFrequency
    for (let [word, frequency] of request.globalWordFrequency) {
      let listItem = document.createElement('li');
      listItem.textContent = `${word}: ${frequency}`;
      wordList.appendChild(listItem);
    }
  
    const wordArray = Array.from(request.globalWordFrequency, ([text, size]) => ({ text, size }));
  

    
    console.log('hello - prelayout')
    if (layout) {
    console.log('layout exists')

      layout.stop().words(wordArray).start();
    }
  }
  
  

});


document.getElementById('start-button').addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {action: "processBlocks"});
  });
});