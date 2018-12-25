
const asyncOperation = (callback) => {
    setTimeout(callback);
};

function task1(callback) {
    asyncOperation(() => {
        task2(callback);
    });
}

function task2(callback) {
    asyncOperation(() => {
        task3(callback);
    });
}

function task3(callback) {
    asyncOperation(() => {
        callback(); // обратный вызов в завершающем задании
    })
}

task1(() => {
    // выполнится после завершения task1, task2 и task3
    console.log(`tasks 1, 2 and 3 executed`);
});