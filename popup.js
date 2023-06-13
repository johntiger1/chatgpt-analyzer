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

// this code is attached to the other button 
document.getElementById('analyzeMeButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(
      tabs[0].id,
      { action: 'analyzeMe' }
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

// glue a button to the wordcloud
document.getElementById('wordcloud-button').addEventListener('click', () => 
{
  console.log('simple things');
  // Sample data
const words = [
  { text: 'hello', size: 40 },
  { text: 'world', size: 30 },
  { text: 'chat', size: 20 },
  { text: 'gpt', size: 50 },
  { text: 'ai', size: 45 },
  { text: 'journalling', size: 35 },
];

// Dimensions
const width = 500;
const height = 500;

// Word cloud layout
const layout = d3.layout.cloud()
  .size([width, height])
  .words(words)
  .padding(5)
  .rotate(() => Math.floor(Math.random() * 2) * 90)
  .fontSize(d => d.size)
  .on('end', draw);

layout.start();

// Function to draw the word cloud
function draw(words) {
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
  // draw(words)
}
);