
const readJSONThrows = require('./example-12.js');

try {
    readJSONThrows('./data/data.txt', (err, result) => {
        
    });
} catch (err) {
    console.log('This will not catch the JSON parsing exception');
}

process.on('uncaughtException', err => {
    console.error('This will catch al last the ' + 
    'JSON parsing exception: ' + err.message);
    // Прерывание приложения с возвратом 1 (ошибка)
    // в качестве кода завершения:
    // если опустить эту строку, работа приложения
    // будет продолжена
    process.exit(1);
})