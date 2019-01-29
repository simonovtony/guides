
const async = require('async');
const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function spider(url, nesting, callback) {
    const filename = utilities.urlToFilename(url);
    fs.readFile(filename, 'utf8', (err, body) => {
        if (err) {
            if (err.code !== 'ENOENT') return callback(err);

            return download(url, filename, (err, body) => {
                if (err) return callback(err);
                spiderLinks(url, body, nesting, callback);
            });
        }
        spiderLinks(url, body, nesting, callback);
    });
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if (nesting === 0) {
        return process.nextTick(callback);
    }
    const links = utilities.getPageLinks(currentUrl, body);
    if (links.length === 0) {
        return process.nextTick(callback);
    }
    /** последовательная */
    // async.eachSeries(links, (link, callback) => {
    //     spider(link, nesting - 1, callback);
    // }, callback);

    /** паралельная */
    async.each(links, (link, callback) => {
        spider(link, nesting - 1, callback);
    }, callback)
}

spider(process.argv[2], (err, filename, downloaded) => {
    if (err) {
        console.log(err);
    } else if (downloaded) {
        console.log(`Completed the download of "${filename}"`);
    } else {
        console.log(`"${filename}" was already downloaded`);
    }
});

function download(url, filename, callback) {
    console.log(`Download ${url}`);
    let body;

    async.series([
        callback => {                                       // [1]
            request(url, (err, response, resBody) => {
                if (err) {
                    return callback(err);
                }
                body = resBody;
                callback();
            });
        }, 

        mkdirp.bind(null, path.dirname(filename)),          // [2]

        callback => {                                       // [3]
            fs.writeFile(filename, body, callback);
        }
    ], err => {                                             // [4]
        if (err) {
            return callback(err);
        }
        console.log(`Download and saved: ${url}`);
        callback(null, body);
    })
}