
const tasks = [
    callback => { 
        setTimeout(() => {
            console.log(1); 
            callback();
        });
    },
    callback => { 
        setTimeout(() => {
            console.log(2); 
            callback();
        });
    },
    callback => { 
        setTimeout(() => {
            console.log(3); 
            callback();
        });
    },
];

function iterate(index) {
    if (index === tasks.length) {
        return finish();
    }
    const task = tasks[index];
    task(function () {
        iterate(index + 1);
    });
}

function finish() {
    // обход завершен
    console.log('finished');
}

iterate(0);