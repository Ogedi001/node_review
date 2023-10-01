const { log } = require('console')
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
EventEmitter.emit('message', user)
EventEmitter.emit('message', user)


//using listeners() to know numbers of listener for a particular event
EventEmitter.on('message',message1)
 EventEmitter.on('message',message2)
 EventEmitter.on('message', message3)

const messageListeners = EventEmitter.listeners('message')
console.log(`Total Message event listeners : ${messageListeners.length} 
They are: ${messageListeners}`);

//error event
