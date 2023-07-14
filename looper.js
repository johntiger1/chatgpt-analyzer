
import { stopwords } from './stopwords.js';

chats = document.querySelectorAll('div.relative:nth-child(4) > ol:nth-child(2) li a');

chats.forEach((li, i) => {  
  
    setTimeout(() => {
          li.click();  
      const text = li.querySelector('.flex-1').textContent.trim();
      console.log(text);  
    }, 2000 * i);
  })



//   document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.dark.flex-shrink-0.overflow-x-hidden.bg-gray-900 > div > div > div > nav > div.flex-col.flex-1.transition-opacity.duration-500.overflow-y-auto.-mr-2 > div > div > span:nth-child(1) > div:nth-child(3) > ol > li:nth-child(5) > a")


// div.pb-2 > div:nth-child(1) > span:nth-child(1) > div:nth-child(2)

// div.relative:nth-child(3) > div:nth-child(1) > h3:nth-child(1)



// #__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.dark.flex-shrink-0.overflow-x-hidden.bg-gray-900 > div > div > div > nav > div.flex-col.flex-1.transition-opacity.duration-500.overflow-y-auto.-mr-2 > div > div > span:nth-child(1) > div:nth-child(3) > ol > li:nth-child(5) > a


// div.pb-2 > div:nth-child(1) > span:nth-child(1)
// 
// all_blocks = '#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.dark.flex-shrink-0.overflow-x-hidden.bg-gray-900 > div > div > div > nav > div.flex-col.flex-1.transition-opacity.duration-500.overflow-y-auto.-mr-2 > div > div > span:nth-child(1)'


// div.pb-2 > div:nth-child(1) > span:nth-child(2) > div:nth-child(1)
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


// now, select the divs inside 
// blocks.querySelectorAll('ol > li')

// we can either write a list; or we can just iterate do them 

// const all_list_items = []
// // iterate each block
// blocks.forEach(block => {
//     listItems.push(...block.querySelectorAll('ol > li'));

//   });

// const per_block_messages = 

// blocks[0]