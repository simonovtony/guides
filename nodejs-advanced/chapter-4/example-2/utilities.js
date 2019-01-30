
module.exports.urlToFilename = (url) => {
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

module.exports.promisify = function (callbackBasedApi) {
    return function promisified() {
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {          
            args.push((err, result) => {                   
                if (err) {
                    return reject(err);                     
                }
                if (arguments.length <= 2) {                
                    resolve(result);
                } else {
                    resulve([].slice.call(arguments, 1));
                }
            })
            callbackBasedApi.apply(null, args);             
        });
    };
};