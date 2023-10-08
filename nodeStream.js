const { log } = require("console");
const fs = require("fs");

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




//.....writeable stream

// Create a Writable stream to write data to a file
// const writableStream = fs.createWriteStream('writeStream.txt')

// // Use the write() method to write data to the stream
// writableStream.write('Hello, ');
// writableStream.write('world! john');
// writableStream.end(); // End the stream to indicate that writing is complete

// // Listen for the 'finish' event to know when writing is finished
// writableStream.on('finish', () => {
//      console.log('finish writing');
// })

// //...creating a Writable stream using the stream module
// const { Writable } = require('stream');

// // Create a custom Writable stream by extending the Writable class
// const customWritableStream = new Writable({
//   write(chunk, encoding, callback) {
//     // Implement your custom write logic here
//     console.log('Received data:', chunk.toString());
//     callback();
//   },
// });

// // Use the customWritableStream to write data
// customWritableStream.write('Hello, world!', 'utf8', () => {
//   console.log('Writing is complete.');
// });

// customWritableStream.write("lets get down to next stream",'utf-8',()=>console.log('done'))

// // End the stream to indicate that writing is done
// customWritableStream.end();



//..writing to a text file through creating a writable stream
// const { Writable } = require("stream");

// const customWritableStream = new Writable({
//   write(chunks, encoding, callback) {
//     fs.appendFile("writeStream.txt", chunks, (err) => {
//       if (err) {
//         //implement error code
//         callback(err);
//       } else {
//         //implement successful writable operation
//         callback();
//       }
//     });
//   },
// });

// // Write data to the stream
// customWritableStream.write(
//   "  Hello , this file will be in writeStream.txt",
//   "utf-8",
//   () => {
//     console.log("Writing is complete.");
//   }
// );


//...Duplex stream
//Extending the Duplex class to customize duplex stream with _write() and _read()
//then creating a new instance of the child duplex class with new keyword

// const {Duplex} = require("stream")
// class MyDuplexStream extends Duplex {

//   //special method that get call when new instance the class is made
//   constructor() {
//     //calling parent class constructor
//   super()
//   }
//   //logics for new method and properties customization

//   //write to stream method
//   _write(chunks, encoding, callback) {
//     //implement custom write logic..
//     console.log("Writing: ", chunks.toString());//indicate success
//     callback()
//   }

//   _read(size) {
// //size = number of bytes requested to be read
//     console.log(size);
//     // Implement custom read logic here
//     // Push data to be read from the stream
//     this.push("Data to read");
//     this.push(null); //signify end of stream, IF IGNORE will continue reading data inifinitly;
//   }

// }

// //new instance of custom duplex class
// const myDuplexStream = new MyDuplexStream();

// // Write data to the Duplex stream
// myDuplexStream.write("Write data", "utf-8", () => {
//   console.log("Write operation complete.");
// });

// // Listen for 'data' event on the Duplex stream to handle data received from the stream
// //emiting data to the user in chuncks asynchronously
//  myDuplexStream.on("data", (chunk) => {
//    console.log("Received:", chunk.toString());
//  });




//....PASSING DATA(dataToBeRead ) as a parameter when creating an instance of duplex stream class
//  const { Duplex } = require("stream");
//  class MyDuplexStream extends Duplex {
//    //special method that get call when new instance the class is made
//    constructor(dataToBeRead,writeFile) {
//      //calling parent class constructor
//      super();
//      //passing variables to the constructor
//      this.dataToBeRead = dataToBeRead
//      this.writeFile = writeFile
//    }
//    //logics for new method and properties customization

//    //write to stream method
   
//    _write(chunks, encoding, callback) {
//      //implement custom write logic..
//      fs.appendFile(ivalid, chunks, (err) => {
//        if (err) {
//          //implement error call back
//          console.error("Error writing to file:", err.message);
//          callback(err); // Call the callback with the error
//        } else {
//           console.log("Writing: ", chunks.toString()); //indicate success
//           callback();
//        }
//      })
    
//    }

//    _read(size) {
//      //size = number of bytes requested to be read
//      console.log(size);
//      // Implement custom read logic here
//      // Push data to be read from the stream
//      this.push(this.dataToBeRead);
//      this.push(null); //signify end of stream, IF IGNORE will continue reading data inifinitly;
//    }
// }
//  const sourceFile = 'someWriteStream.txt'
// const readableData = 'my name is ogedi'
// const writableData = 'we have pass the location of this text file  as we create the duplex stream instance'
// const myDuplexStream = new MyDuplexStream(readableData,sourceFile);

//  myDuplexStream.write(writableData, "utf-8", (error) => {
//    if (error) {
//      console.error("Error writing to stream:", error.message);
//    } else {
//      console.log("Write operation complete.");
//    }
//  });
   
// myDuplexStream.on('data', (chunk) => {
//    console.log("Received:", chunk.toString());
// })





//......Transform Stream
const { Transform } = require('stream')

//creating uppercase transform stream class from transform stream class
// class UppercaseTransform extends Transform {
//   constructor() {
//     super();
//   }
//   _transform(chunk, encoding, callback) {
//     // Implement custom transformation logic here
//     const transformedData = chunk.toString().toUpperCase(); // Modify the data as needed
//     this.push(transformedData); // Push the transformed data to the output
//     callback(); // Call the callback to indicate processing is complete
//   }
// }

// const uppercaseTransform = new UppercaseTransform()
// const readStream = fs.createReadStream('writeStream.txt')
// const writeStream = fs.createWriteStream('transformOutput.txt')


// //Pipe data into the transform stream from a readable stream (e.g., a file stream), then pipe to writable stream
// readStream.pipe(uppercaseTransform).pipe(writeStream)

// //emit data piped into the transform stream
// uppercaseTransform.on('data', (chunk) => {
//   log('Transform data : ', chunk.toString())
// })





// JSON PARSING data and extracts specific fields.

// -