
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
    callback => { 
        setTimeout(() => { 
            console.log(4); 
            callback();
        });
    },
];

let concurrency = 2,
    running = 0,
    completed = 0,
    index = 0;

function next() {                                               // [1]
    // right way
    if (completed === tasks.length) {
        return finish();
    }
    while (running < concurrency && index < tasks.length) {
        task = tasks[index++];
        task(() => {                                            // [2]
            // wrong way
            // if (completed === tasks.length) {
            //     return finish();
            // }
            completed++, running--;
            next();
        });
        running++;
    }
}

next();

function finish() {
    // все задания выполнены
    console.log('finish');
}