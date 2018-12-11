
let obj = {};

const map = new WeakMap();

map.set(obj, { key: 'some_value' });

console.log(map.get(obj)); // { key: 'some_value' }

obj = undefined; // теперь obj и связнные ним данные
                 // будут очищены при следующей сборке мусора