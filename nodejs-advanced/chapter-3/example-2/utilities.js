
module.exports.urlToFilename = (url) => {
    const filename = url.replace(/[^a-z0-9]/gi, '');
    return filename;
};