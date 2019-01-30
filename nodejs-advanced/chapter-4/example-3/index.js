
let tasks = [
    () => {
        console.log(1);
    },
    () => {
        return new Promise(resolve => {
            console.log(2);
            resolve();
        });
    },
    () => {
        console.log(3);
    }
];

let promise = Promise.resolve();

tasks.forEach(task => {
    promise = promise.then(() => {
        return task();
    });
});

promise.then(() => {
    // Все задания выполнены
    console.log('Все задания выполнены');
});