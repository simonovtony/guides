
const fs = require('fs');

fs.readFile('./data/data.txt', 'utf8', (err, data) => {
    if (err) {
        handleError(err);
    } else {
        processData(data);
    }
});

function handleError(err) {
    console.error(err);
}

function processData(data) {
    console.log(data);
}