
const createFileReader = require('./example-6');

const reader1 = createFileReader('./data/text.txt');

reader1.onDataReady(data => {
    console.log('First call data: ' + data);
    // ...чуть позже попытаемся вновь прочитать данные из 
    // того же файла
    const reader2  = createFileReader('./data/data.txt');
    reader2.onDataReady(data => {
        console.log('Second call data: ' + data);
    })
});