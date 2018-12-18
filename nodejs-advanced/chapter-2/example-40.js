
const FindPattern = require('./example-39');

const findPatternObject = new FindPattern(/hello \w+/);

findPatternObject
    .addFile('./data/fileA.txt')
    .addFile('./data/fileB.json')
    .find()
    .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
    .on('error', err => console.log(`Error emitted ${err.message}`));