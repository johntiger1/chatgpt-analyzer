console.log('aqweq adding event listener')
const topK = 25;

// function draw(words) {
//   // Clear any existing word cloud
//   d3.select('#word-cloud').html('');

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
//     .style('font-size', d => `${d.size }px`)
//     .style('fill', (d, i) => d3.schemeCategory10[i % 10])
//     .attr('text-anchor', 'middle')
//     .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
//     .text(d => d.text);
// }


// let layout;

// // Word cloud layout
// const width = 500;
// const height = 500;

// layout = d3.layout.cloud()
//   .size([width, height])
//   .padding(5)
//   .rotate(() => Math.floor(Math.random() * 2) * 90)
//   .fontSize(d => d.size)
//   .on('end', draw);

// layout.start();




// List of words
var myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate"]

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;



// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d}; }))
  .padding(10)
  .fontSize(60)
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Better not to touch it. To change parameters, play with the 'layout' variable above
function draw(words) {

  d3.select('#word-cloud').html('');

  // append the svg object to the body of the page
  var svg = d3.select("#word-cloud").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .attr("text-anchor", "middle")
        .style('fill', (d, i) => d3.schemeCategory10[i % 10])
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}

const BarChart = {
  svg: null,
  x: null,
  y: null,
  xAxis: null,
  yAxis: null,
  color: null,

  initializeChart: function() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = 500 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    // Create SVG
    this.svg = d3.select("#word-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    this.y = d3.scaleBand()
      .range([0, height])  // Reverse the range
      .padding(0.1);
    this.x = d3.scaleLinear()
      .range([0, width]);

    // Create color scale
    this.color = d3.scaleSequential(d3.interpolateRainbow);

    // Create axes
    this.xAxis = this.svg.append("g")
      .attr("transform", `translate(0, ${height})`);
  },

  drawChart: function(wordArray) {
    // Sort and slice wordArray
    wordArray.sort((a, b) => b.size - a.size);
    wordArray = wordArray.slice(0, 10);

    // Update scale domains
    this.y.domain(wordArray.map(d => d.text));
    this.x.domain([0, d3.max(wordArray, d => d.size)]);
    this.color.domain([0, wordArray.length - 1]);

    // Bind data
    const bars = this.svg.selectAll(".bar")
      .data(wordArray, d => d.text);

    // Handle exit selection
    bars.exit().remove();

    // Handle enter selection
    const enter = bars.enter().append("g");

    enter.append("rect")
      .attr("class", "bar")
      .attr("y", d => this.y(d.text))
      .attr("height", this.y.bandwidth())
      .attr("x", 0)
      .attr("width", 0)
      .attr("fill", (d, i) => this.color(i));

      enter.append("text")
      .attr("class", "bar-text")
      .attr("y", d => this.y(d.text) + this.y.bandwidth() / 2)
      .attr("x", d => this.x(d.size))  // Position text at the end of the bar
      .attr("dx", "-.2em")  // Small right padding for the text inside the bar
      .attr("dy", ".35em")
      .attr("text-anchor", "end")  // Align text to the end of the bar
      .attr("fill", "black")  // Set a contrasting color for the text
      .text(d => d.text);

    // Update selection
    const update = bars.merge(enter);

    update.select("rect")
      .transition().duration(1000)
      .attr("y", d => this.y(d.text))
      .attr("height", this.y.bandwidth())
      .attr("x", 0)
      .attr("width", d => this.x(d.size))
      .attr("fill", (d, i) => this.color(i));

      update.select("text")
      .transition().duration(1000)
      .attr("y", d => this.y(d.text) + this.y.bandwidth() / 2)
      .attr("x", d => this.x(d.size))  // Update position of the text 
      .attr("dx", "-.2em")  // Small right padding for the text inside the bar
      .attr("text-anchor", "end")  // Align text to the end of the bar
      .attr("fill", "black")  // Set a contrasting color for the text
      .text(d => d.text);

    // Update axes
    this.xAxis.transition().duration(1000).call(d3.axisBottom(this.x));
  }
};





BarChart.initializeChart();

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "progessBarUpdate") {

    // Change the text of the element
    const progressBar = document.getElementById('progress-bar');
    const progressBarCurrLength = document.getElementById('current-iteration');
    const progressStatusText = document.getElementById('current-status');


    progressBar.style.width = request.width;
    progressBarCurrLength.textContent = request.iter;
    progressStatusText.textContent = "Currently processing...";
    


  }

  else if  (request.action=="initializeProgressBar") {
    const progressBarTotalLength = document.getElementById('total-length');
    const numberOfChats = document.getElementById('number-of-chats');
    const progressStatusText = document.getElementById('current-status');

    progressBarTotalLength.textContent = request.length
    numberOfChats.textContent = "Identified " + request.length + " chats!"
    progressStatusText.textContent = "Beginning processing..."
    const start_button = document.getElementById('start-button')
    start_button.innerHTML = 'Processing...';
    start_button.disabled = true;


  }

  else if  (request.action=="finishProgress") {
    const progressStatusText = document.getElementById('current-status');
    progressStatusText.textContent = "Finished!"
    const start_button = document.getElementById('start-button')

    start_button.innerHTML = 'Start Processing';
    start_button.disabled = false;
  }

  else if (request.action=="wordCounterUpdate"){
    console.log('updating the word log');
    let wordList = document.getElementById('wordList');
  
    // Clear any existing entries
    wordList.innerHTML = '';
    
    let iterationCount = 0;
    for (let [word, frequency] of request.globalWordFrequency) {
      let listItem = document.createElement('li');
      listItem.textContent = `${word}: ${frequency}`;
      wordList.appendChild(listItem);
      
      iterationCount++;
      if (iterationCount >= topK) {
        break;
      }
    
    
    
    }


  const wordArray = Array.from(request.globalWordFrequency, ([text, size]) => ({ text, size }));
  
  BarChart.drawChart(wordArray);  
  }

  else if (request.action=="wordCloudUpdate"){
    console.log('updating the word cloud');
 
    const wordArray = Array.from(request.globalWordFrequency, ([text, size]) => ({ text, size }));
    
    // Sort the array in descending order based on the 'size' property
    wordArray.sort((a, b) => b.size - a.size);

    // Get the top 25 elements using the slice method
    const top25Words = wordArray.slice(0, topK);
    console.log('hello - prelayout')
    if (layout) {
    console.log('layout exists')

      layout.stop().words(top25Words).start();
    }
  }
  
  

});


document.getElementById('start-button').addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {action: "processBlocks"});
  });
});


