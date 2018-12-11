
const numbers = [2, 6, 7, 8, 1];

const event = numbers.filter(function(x) {
    return x % 2 === 0;
});

console.log(event);