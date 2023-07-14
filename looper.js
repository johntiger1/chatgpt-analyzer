import { stopwords } from './stopwords.js';

const stopwordsSet = new Set(stopwords);

function filterWord(word) {
  word = word.toLowerCase();
  if (stopwordsSet.has(word) || /^\d+$/.test(word)) {
    return false;
  }
  return true;
}

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
    const messages = Array.from(text_divs).map((element) => element.childNodes[0].childNodes[1].textContent);
    const allWords = messages.join(' ').split(/\s+/);

    let wordFrequency = allWords.reduce((acc, word) => {
      if (filterWord(word)) {
        acc[word] = (acc[word] || 0) + 1;
      }
      return acc;
    }, {});

    let arrayFrequency = Object.entries(wordFrequency);
    arrayFrequency.sort((a, b) => b[1] - a[1]);
    wordFrequency = Object.fromEntries(arrayFrequency);

    console.log('new iteration', i);
    console.log(wordFrequency);
  }
}

processBlocks();