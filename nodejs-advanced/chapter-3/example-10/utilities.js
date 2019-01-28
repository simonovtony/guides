
module.exports.urlToFilename = (url) => {
    const filename = url.replace(/[^a-z0-9]/gi, '');
    return filename;
};

module.exports.getPageLinks = (url, body) => {
    const hrefs = body.match(/href\=\"(.*)\"/g) || [];
    hrefs.forEach((href, index) => {
        hrefs[index] = href
            .replace('href="', '')
            .replace(/\"$/g, '');
    });
    const srcs = body.match(/src\=\"(.*)\"/g) || [];
    srcs.forEach((src, index) => {
        srcs[index] = src
            .replace('src="', '')
            .replace(/\"$/g, '');
    });
    const urls = [...hrefs, ...srcs];
    console.log(urls);
    urls.forEach((value, index) => {
        if (value.indexOf('/') === 0)
            urls[index] = `${url}/${value}`;
    })
    return urls;
};