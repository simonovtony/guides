const EventEmitter = require('events').EventEmitter;

function helloEvents() {
    const eventEmitter = new EventEmitter();
    setTimeout(() => eventEmitter.emit('hello', 'hello world'), 100);
    return eventEmitter;
}

function helloCallback(callback) {
    setTimeout(() => callback('hello world'), 100);
}

helloEvents()
    .on('hello', message => console.log('event "hello" #1: ' + message))
    .on('hello', message => console.log('event "hello" #2: ' + message))

helloCallback(message => console.log('callback: ' + message));