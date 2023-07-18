// // Sample data
// const words = [
//     { text: 'hello', size: 40 },
//     { text: 'world', size: 30 },
//     { text: 'chat', size: 20 },
//     { text: 'gpt', size: 50 },
//     { text: 'ai', size: 45 },
//     { text: 'journalling', size: 35 },
//   ];
  
//   // Dimensions
//   const width = 500;
//   const height = 500;
  
//   // Word cloud layout
//   const layout = d3.layout.cloud()
//     .size([width, height])
//     .words(words)
//     .padding(5)
//     .rotate(() => Math.floor(Math.random() * 2) * 90)
//     .fontSize(d => d.size)
//     .on('end', draw);
  
//   layout.start();
  
//   // Function to draw the word cloud
//   function draw(words) {
//     const svg = d3.select('#word-cloud')
//       .append('svg')
//       .attr('width', layout.size()[0])
//       .attr('height', layout.size()[1])
//       .append('g')
//       .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);
  
//     const text = svg.selectAll('text')
//       .data(words)
//       .enter()
//       .append('text')
//       .style('font-size', d => `${d.size}px`)
//       .style('fill', (d, i) => d3.schemeCategory10[i % 10])
//       .attr('text-anchor', 'middle')
//       .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
//       .text(d => d.text);
//   }