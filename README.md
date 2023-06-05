# chatgpt-analyzer
analyzeGPT or journalGPT


some webdev things:
1. chrome vs firefox
2. security issues (running code in a browser environment)
3. code execution environment - browser: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

In our first example:
the content.js script analyzes the content of the web page and calculates word frequencies, while the popup.js script handles the user interface and sends messages to the content.js script to trigger the analysis.


popup.js =>
linked from index.html
1. adds event listener to the button


from manifest.json:
content.js
1. actually performs the logic
2. runs in 
3. Content scripts cannot directly access normal page scripts but can exchange messages with them using the standard window.postMessage() API.


Logic between popup/content:
1. popup js => the java sccript for the popup
2. content js => the javascript for the extension overall

