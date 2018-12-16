
const loadModule = require('./example-15');

const _require = (moduleName) => {
    console.log(`Require invoked for module: ${moduleName}`);

    const id = require.resolve(moduleName); // [1]

    if (require.cache[id]) {                // [2]
        return require.cache[id].exports;
    }

    // метаданные модуля
    const _module = {                       // [3]
        exports: {},
        id: id
    };

    // пополнить кэш
    require.cache[id] = _module;            // [4]

    // загрузить модуль
    loadModule(id, _module, _require);      // [5]

    // вернуть экспортируемые переменные
    return _module.exports;                 // [6]
};

_require.cache = {};
_require.resolve = (moduleName) => {
    /* извлечение полного идентификатора модуля по имени модуля */
};

//////////////////////////////////////////////////////////////////////
const test = _require('./data/test');
console.log(test);