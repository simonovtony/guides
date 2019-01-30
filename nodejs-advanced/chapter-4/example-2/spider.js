
const utilities = require('./utilities');

const request = utilities.promisify( require('request') );
const mkdirp = utilities.promisify( require('mkdirp') );
const fs = require('fs');
const readFile = utilities.promisify( fs.readFile );
const writeFile = utilities.promisify( fs.writeFile );

function download(url, filename) {
    console.log(`Downloading ${url}`);
    let body;
    return request(url)
        .then(response => {
            body = response.body;
            return mkdirp(path.dirname(filename))
        })
        .then(() => writeFile(filename, body))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return body;
        });
}

function spiderLinks(currentUrl, body, nesting) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    const links = utilities.getPageLinks(currentUrl, body);
    /** series */
    // links.forEach(link => {
    //     promise = promise.then(() => spider(link, nesting - 1));
    // });
    // return promise;
    /** parallel */
    const promises = links.map(link => spider(link, nesting - 1));
    return Promise.all(promises);
}

function spider(url, nesting) {
    const filename = utilities.urlToFilename(url);

    return readFile(filename, 'utf-8')
        .then(body => {
            if (err.code !== 'ENOENT') throw err;

            return download(url, filename)
                .then(body => {
                    return spiderLinks(url, body, nesting);
                });
        })
        .catch(err => {
            return spiderLinks(url, body, nesting);
        });
}

spider = utilities.promisify(spider);

spider(process.argv[2], 1)
    .then(() => console.log('Download complete'))
    .catch(() => console.log(err));