// import { stopwords } from './stopwords.js';
console.log('beginning')
async function processBlocks() {


    const stopwords = [
        'i',
        'me', 
        'my',
        'myself',
        'we',
        'our',
        'ours',
        'ourselves',
        'you',
        'your',
        'yours',
        'yourself',
        'yourselves',
        'he',
        'him',
        'his',
        'himself',
        'she',
        'her',
        'hers',
        'herself',
        'it',
        'its',
        'itself',
        'they',
        'them',
        'their',
        'theirs',
        'themselves',
        'what',
        'which',
        'who',
        'whom',
        'this',
        'that',
        'these',
        'those',
        'am',
        'is',
        'are',
        'was',
        'were',
        'be',
        'been',
        'being',
        'have',
        'has',
        'had',
        'having',
        'do',
        'does',
        'did',
        'doing',
        'a',
        'an',
        'the',
        'and',
        'but',
        'if',
        'or',
        'because',
        'as',
        'until',
        'while',
        'of',
        'at',
        'by',
        'for',
        'with',
        'about',
        'against',
        'between',
        'into',
        'through',
        'during',
        'before',
        'after',
        'above',
        'below',
        'to',
        'from',
        'up',
        'down',
        'in',
        'out',
        'on',
        'off',
        'over',
        'under',
        'again',
        'further',
        'then',
        'once',
        'here',
        'there',
        'when',
        'where',
        'why',
        'how',
        'all',
        'any',
        'both',
        'each',
        'few',
        'more',
        'most',
        'other',
        'some',
        'such',
        'no',
        'nor',
        'not',
        'only',
        'own',
        'same',
        'so',
        'than',
        'too',
        'very',
        's',
        't',
        'can',
        'will',
        'just',
        'don',
        'should',
        'now'
      ];
      
    
      
    console.log('running code')
    const stopwordsSet = new Set(stopwords);
    
    function filterWord(word) {
        // Convert to lowercase
        word = word.toLowerCase();

        // Remove non-alphanumeric characters
        word = word.replace(/[^a-z0-9]/gi, '');

        // Filter out stopwords, numeric strings, and short words
        if (stopwordsSet.has(word) || /^\d+$/.test(word) || word.length < 3) {
            return false;
        }

        return true;
    }
    console.log('running');
    
    const fullblocks = document.querySelectorAll('div.pb-2 > div:nth-child(1) > span:nth-child(-n+2) > div > ol > li > a');
    browser.runtime.sendMessage({action: "initializeProgressBar", length: fullblocks.length});

    
// also keep track of the past history of chats
let globalWordFrequency = new Map();

for (let i = 0; i < fullblocks.length; i++) {
  await new Promise(resolve => {
    setTimeout(() => {
      fullblocks[i].click();
      resolve();  
    }, 2000);
  });

  var text_divs = document.querySelectorAll("div.group:nth-child(2n+1)");

  // Error checking: if text_divs is empty
  if (!text_divs.length) {
    console.error(`No matching elements found for "div.group:nth-child(2n+1)" at iteration ${i}.`);
    continue;  // Skip this iteration and continue with the next one
  }

  const messages = Array.from(text_divs).map((element) => element.childNodes[0].childNodes[1].textContent);
  const allWords = messages.join(' ').split(/\s+/);

  let wordFrequency = allWords.reduce((acc, word) => {
    if (filterWord(word)) {
      acc[word] = (acc[word] || 0) + 1;  // Update wordFrequency
      globalWordFrequency.set(word, (globalWordFrequency.get(word) || 0) + 1);  // Update globalWordFrequency
    }
    return acc;
  }, {});

  let arrayFrequency = Object.entries(wordFrequency);
  arrayFrequency.sort((a, b) => b[1] - a[1]);
  wordFrequency = Object.fromEntries(arrayFrequency);
  
  console.log('new iteration', i);
  console.log(wordFrequency);


// Convert the globalWordFrequency Map to an array of entries
let globalArrayFrequency = Array.from(globalWordFrequency.entries());

// Sort the array by frequency in descending order
globalArrayFrequency.sort((a, b) => b[1] - a[1]);

// If you still need a Map, convert the sorted array back into a Map
globalWordFrequency = new Map(globalArrayFrequency);

    browser.runtime.sendMessage({action: "wordCounterUpdate", globalWordFrequency: globalWordFrequency });
    
    if (i % 3 == 0){
        browser.runtime.sendMessage({action: "wordCloudUpdate", globalWordFrequency: globalWordFrequency });

    }
    

    browser.runtime.sendMessage({action: "progessBarUpdate", width: ((i + 1) / fullblocks.length) * 100 + '%', iter: i});


  }

  browser.runtime.sendMessage({action: "finishProgress"});

}

// document.getElementById('start-button').addEventListener('click', processBlocks);

// console.log('ready to run')
// console.log(progressBar, fullblocks)


// Add listener for messages from the popup script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "processBlocks") {
      processBlocks().then(result => {
        sendResponse(result);
      })
      .catch(error => console.error(error));
    }
    return true; // Indicate that we will respond asynchronously
  });
  
console.log('ready to run');
  