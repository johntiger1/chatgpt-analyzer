browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze') {
    // Select all <p> elements within divs with the 'markdown' and 'prose' classes
    const messageElements = document.querySelectorAll('.markdown.prose p');

    // Extract the text from the message elements
    const messages = Array.from(messageElements).map((element) => element.textContent);

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



// import { stopwords } from './stopwords.js';


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
word = word.toLowerCase();
if (stopwordsSet.has(word) || /^\d+$/.test(word)) {
  return false;
}
return true;
}
console.log('running');

const progressBar = document.getElementById('progress-bar');
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
  progressBar.style.width = ((i + 1) / fullblocks.length) * 100 + '%';
}
}

// document.getElementById('start-button').addEventListener('click', processBlocks);

// console.log('ready to run')
// console.log(progressBar, fullblocks)


// Add listener for messages from the popup script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processBlocks") {
    processBlocks();
  }
});

console.log('ready to run')
