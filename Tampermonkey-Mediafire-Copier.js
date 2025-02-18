// ==UserScript==
// @name         Copy MediaFire Details
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract MediaFire links, file size, first H2 text, and date, then copy to clipboard
// @author       You
// @match        *://www.skidrowreloaded.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Create and style the button
    let button = document.createElement('button');
    button.innerText = 'Copy Details';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        // Get unique MediaFire links
        let mediafireLinks = [...new Set(Array.from(document.querySelectorAll('a[href*="mediafire.com"]'))
            .map(a => a.href))];

        // Get the file size from text on the page
        let sizeMatch = document.body.innerText.match(/Size:\s*([\d.]+\s*[A-Za-z]+)/);
        let fileSize = sizeMatch ? sizeMatch[1] : "Unknown";

        // Get the first H2 text
        let firstH2 = document.querySelector('h2');
        let titleText = firstH2 ? firstH2.innerText.trim() : "Untitled";

        // Get current date
        let currentDate = new Date().toISOString().split('T')[0];

        // Create JSON output
        let output = {
            "title": titleText,
            "fileSize": fileSize,
            "uris": mediafireLinks,
            "uploadDate": currentDate
        };

        // Copy to clipboard
        GM_setClipboard(JSON.stringify(output, null, 4));
    });
})();
