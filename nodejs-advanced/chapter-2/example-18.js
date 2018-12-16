
// всё нормально
exports.hello = () => {
    console.log('Hello');
};

// module.exports не изменен, то есть переменная уже не ссылка на module.exports
exports = () => {
    console.log('Hello');
};

// exports уже не актуален, потому что module.exports != exports
module.exports = () => {
    console.log('Hello');
};