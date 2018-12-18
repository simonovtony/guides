
const findPattern = require('./example-37');

findPattern(
    ['./data/fileA.txt', './data/fileB.json'], //['fileA.txt', 'fileB.txt'],
    /hello \w/g
)
.on('fileread', file => console.log(file + ' was read'))
.on('found', (file, match) => console.log('Matched "' + match + '" in file ' + file))
.on('error', err => console.log('Error emitted: ' + err.message));