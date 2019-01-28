
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

let completed = 0;

tasks.forEach(task => {
    task(() => {
        if (++completed === tasks.length) {
            finish();
        }
    });
});

function finish() {
    // все задания выполнены
    console.log('finish');
}