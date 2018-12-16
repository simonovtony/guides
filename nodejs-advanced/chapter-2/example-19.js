
// не правильно, module.exports должен быть синхронным
setTimeout(() => {
    module.exports = function () { };
});