
 const fs = require('fs');

// const readableStream = fs.createReadStream('example.txt');

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








// // create a read stream from the file example.txt.
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

//piping to move some data in a source to another destination
const readStream = fs.createReadStream('example.txt');
const writeStream = fs.createWriteStream('someWriteStream.txt');

readStream.pipe(writeStream, (chunk) => {

    console.log("source data length:", chunk.length)
  // If the chunk of data is smaller than 100 bytes, write it to the destination stream.
  if (chunk.length < 10) {
    writeStream.write(chunk);
  }
});
