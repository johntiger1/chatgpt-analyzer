
import { stopwords } from './stopwords.js';

// history grouping
const blocks = document.querySelectorAll('div.pb-2 > div:nth-child(1) > span:nth-child(-n+2) > div')

// instead, get the list of all messages
const fullblocks = document.querySelectorAll('div.pb-2 > div:nth-child(1) > span:nth-child(-n+2) > div > ol > li > a');

async function processBlocks() {

  for (let i = 0; i < fullblocks.length; i++) {

    await new Promise(resolve => {
      setTimeout(() => {
        fullblocks[i].click();
        
        resolve();  
      }, 2000);
    });


    
    var text_divs = document.querySelectorAll("div.group:nth-child(2n+1)");


    // Extract the text from the message elements
    const messages = Array.from(text_divs).map((element) => element.childNodes[0].childNodes[1].textContent);
    
    // Combine all messages into a single string and split it into words
    const allWords = messages.join(' ').split(/\s+/);

    // Filter out stopwords and calculate word frequency
    const wordFrequency = allWords.reduce((acc, word) => {
    word = word.toLowerCase();
    if (!stopwords.includes(word)) {
        acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
    }, {});



    console.log('new iteration', i);
    console.log(wordFrequency);

  }

}

processBlocks();


