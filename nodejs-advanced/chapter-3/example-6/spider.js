
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

    let completed = 0, hasError = false;

    function done(err) {
        if (err) {
            hasError = true;
            return callback(err);
        }
        if (++completed === links.length && !hasError) {
            return callback();
        }
    }
    links.forEach(link => {
        spider(link, nesting - 1, done);
    });
}

function saveFile(filename, contents, callback) {
    mkdirp(path.dirname(filename), err => {
        if (err) return callback(err);
        fs.writeFile(filename, contents, callback);
    });
}

function download(url, filename, callback) {
    console.log(`Download ${url}`);
    request(url, (err, response, body) => {
        if (err) return callback(err);
        saveFile(filename, body, err => {
            if (err) return callback(err);
            console.log(`Downloaded and saved: ${url}`);
            callback(null, body);
        })
    });
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