
const utilitites = require('./utilities');
const fs = require('fs');
const path = require('path');

const readFile = utilitites.promisify(fs.readFile);

readFile(path.resolve(__dirname, 'utilities.js'), 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    })