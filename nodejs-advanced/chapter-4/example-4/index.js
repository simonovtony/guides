
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

let promise = tasks.reduce((prev, task) => {
    return prev.then(() => {
        return task();
    })
}, Promise.resolve());

promise.then(() => {
    // Все задания выполнены
    console.log('Все задания выполнены');
});