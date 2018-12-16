
// загрузка зависимости
const dependency = require('./data/anotherModule');

// закрытая функция
function log() {
    console.log(`Well done ${dependency.username}`);
}

// экспортируемый общедоступный интерфейс
module.exports.run = () => {
    log();
};