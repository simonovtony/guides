
const fs = require('fs');

function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        let parsed;
        if (err) 
            // распространение ошибки и выход из текущей функции
            return callback(err);

        try {
            // анализ содержимого файла
            parsed = JSON.parse(data);
        } catch (err) {
            // перехват обрабатываемых ошибок
            return callback(err);
        }

        // ошибок нет, передаются только данные
        callback(null, parsed);
    });
}

/*
readJSON('./data/data.json', (err, data) => {
    if (err) 
        console.error(err);
    else
        console.log(data);
});
*/