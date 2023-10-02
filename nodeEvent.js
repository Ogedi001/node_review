
const event = require('events')

const EventEmitter = new event()
//share argument and side effect

// EventEmitter.on('message', (user) => console.log(`user1 ${user}`))
// EventEmitter.on('message', (user) => {
//     user.name != null ? user.age = 12 : undefined
//     console.log('message 2', user)
// }
// )
// EventEmitter.on('message',(user)=> {
//     console.log(`message 3; ${user}`)
// })


// const user = { name: 'micheal' }
// EventEmitter.emit('message', user)

//unscribing from event emitter
const message1 = (user) => console.log(`user1 ${user}`)
const message2 =  (user) => {
    user.name != null ? user.age = 12 : undefined
    console.log('message 2', user)
}
const message3=(user)=> {
    console.log(`message 3; ${user}`)
}

// EventEmitter.on('message',message1)
// EventEmitter.on('message',message2)
// EventEmitter.on('message', message3)




// const user = { name: 'micheal' }
// //emiting twice
// EventEmitter.emit('message', user)
// EventEmitter.emit('message', user)

// //unsubscribing from message event
// EventEmitter.off('message',message1)
// EventEmitter.off('message',message2)
// EventEmitter.off('message', message3)

//USE EventEmitter.once to be raised once and you dont have to unsubscribe
EventEmitter.once('message',message1)
EventEmitter.once('message',message2)
EventEmitter.once('message', message3)

const user = { name: 'micheal' }
//event will only emit once despite been call twice
// EventEmitter.emit('message', user)
// EventEmitter.emit('message', user)


//using listeners() to know numbers of listener for a particular event
// EventEmitter.on('message',message1)
//  EventEmitter.on('message',message2)
//  EventEmitter.on('message', message3)

// const messageListeners = EventEmitter.listeners('message')
// console.log(`Total Message event listeners : ${messageListeners.length}
// They are: ${messageListeners}`);

//error event
// const errorEvent = () => {
// // creating an new error objects from the ERROR class
//     const error = new Error("something terible happen")

//     console.log(`Error Object =>${error}
//     Error Code: ${error.code}
//     Error message: ${error.message}`)
// }

// EventEmitter.on('error', errorEvent)
// EventEmitter.emit('error')
//EventEmitter.off('error',errorEvent)


EventEmitter.on('error', (error) => {
    console.log('An error occurred:', error.errorMessages());
})

// Simulate an operation that can throw an error
const simulateError = () => {
    if (Math.random() < 0.5) {
        // Create an error object and modified object
        const error = new Error('Oops! Something went wrong.')
         error.errorMessages = () => {
            error.code = 404;
            error.time = new Date().toLocaleTimeString();
             return (`${error.code} => ${error.message}
             ${error.time}`);
        };
// Emit the 'error' event with the error object
        EventEmitter.emit('error', error);

    } else {
        // Simulate a successful operation
        console.log('Operation succeeded!');
    }
}
// Call the function that may throw an error
try {
    simulateError();
} catch (error) {
    // Handle any synchronous errors here
    console.error('Synchronous error:', error);
}

console.log('Program continues...');

