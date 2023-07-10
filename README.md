# chatgpt-analyzer
analyzeGPT or journalGPT

# Architecture - simplified
1. popup html => the html
2. popup js => specifies the logic behind the popup html buttons - which scripts to trigger upon button press, which messages to pass, and what to do with the response/
3. individual script files - specifies the logic for their component. Given a message, return a response

therefore:
1. we can loop over all the pages (one click each)
2. after each click, we run the given button

Control flow:
1. user clicks analyze all my conversations!
2. we click each chat, and wait for it to load
3. we then trigger another message *and wait*
4. for each triggered chat, we crunch the data and run the function. if we like, then we can save it to memory.

# Architecture
- popup.html contains the document structure for the popup
- popup.css contains the css (optional for now)
- popup.js contains js for modifying the popup html itself
- content.js contains js for actually triggering the logic on the page itself. i.e. attaching the listener to the page
- manifest.json contains the manifest, including author, license, and overall specifying the structure of the add on
- add.js contains some additional logic

In general, we can view it as the following:
- content.js/manifest.json js => loaded with the script/before. can attach the listeners to buttons etc. (glue logic)
- functions/abc.js => contains the code behind the buttons (business logic)

# Tools used
- Logo generated [here](https://www.bing.com/images/create/create-a-logo-for-journalanalytics2c-which-analyzes/647e0c3549274ddda094144c55a61012?id=8fHhMS34fZQWPAjwF1nn2g%3d%3d&view=detailv2&idpp=genimg&FORM=GCRIDP&ajaxhist=0&ajaxserp=0)
- Resized [here](https://imageresizer.com/) 

# Gotchas - some webdev things:
1. chrome vs firefox
2. security issues (running code in a browser environment)
3. code execution environment - browser: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

```
const globalConsole = unsafeWindow.console; 
```

In our specific example:
the content.js script analyzes the content of the web page and calculates word frequencies, while the popup.js script handles the user interface and sends messages to the content.js script to trigger the analysis.


popup.js =>
linked from index.html
1. adds event listener to the button


from manifest.json:
content.js
1. actually performs the logic
2. runs in 
3. Content scripts cannot directly access normal page scripts but can exchange messages with them using the standard window.postMessage() API.


More generally, the logic between popup/content:
1. popup js => the javascript for the popup
2. content js => the javascript for the extension overall

