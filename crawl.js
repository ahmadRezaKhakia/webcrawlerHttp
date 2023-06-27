const { JSDOM } = require('jsdom');


async function crawlPage(baseURL,currentURL,pages) {
    const baseURLObj = new URL(baseURL);
    const currentURlObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURlObj.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURl(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling: ${currentURL}`);


    try {
        const resp = await fetch(currentURL);

        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if (!contentType.includes('text/html')) {
              console.log(`none html response , content type: ${contentType}, on page: ${currentURL}`);
            return pages;
        }
        
        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }

    } catch (err) {
        console.log(`Error in fetch ${err} , on page : ${currentURL}`)
    }
    return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with relative url ${err.message}`);
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error with absolute url ${err.message}`);
            }
        }

    }

    return urls;
}


function normalizeURl(urlString) {
    const urlObj = new URL(urlString);
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1);
    }
    return hostpath
}

module.exports = {
    normalizeURl,
    getURLsFromHTML,
    crawlPage
}