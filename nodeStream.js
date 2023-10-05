
 const fs = require('fs');

//  //creating a read stream from data in example.txt
// const readableStream = fs.createReadStream('example.txt');

// //emitting a data event from stream when ready
// readableStream.on('data', (chunk) => {
//     console.log('Received a chunk of data:', chunk.toString());
// });

// readableStream.on('end', () => {
//     console.log('Finished reading the file.');
// });

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin, // Read from stdin
//     output: process.stdout,
// });

// rl.question('Enter something: ', (answer) => {
//     console.log(`You entered: ${answer}`);
//     rl.close();
// });








// //...... create a read stream from a source file (example.txt.)
// const readStream = fs.createReadStream('example.txt');

// //We then subscribe to the data and end events.
// //The data event is emitted whenever the stream has read a chunk of data.
// readStream.on('data', (chunk) => {
//     // Process the chunk of data
//     console.log('chunck data', chunk.toString());
// });

// readStream.on('end', () => {
//     //The end event is emitted when the stream has finished reading the fileno
//     // The stream has finished reading the file
//     console.log('the end');
//});


//using pipe() to connect stream  together and data transfer from stream to stream
// const sourceStream = fs.createReadStream('example.txt')
// const destinationStream = fs.createWriteStream('writeStream.txt')

// sourceStream.pipe(destinationStream)







//.....Creating Readable stream from node  stream
//import Readable class from stream
// const { Readable } = require('stream');

// // creating a read stream instance of the Readable stream class
// const readableStream = new Readable({
     //implement read method
//     read() {
//  //Push data to the stream
// this.push('ping!');
// this.push('pong!');
// this.push(null)//signify end of stream
// }
// });


// // Read the data from the stream
// const data = readableStream.read();

// // Do something with the data
// console.log(data.toString());


//....piping to move some data in a source to another destination