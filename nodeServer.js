
const { log } = require('console')
const fs = require('fs')
const http = require('http')


//creating a node server
const server = http.createServer((req, res) => {
    console.log('server have been created')

    //exit server
    //console.log('existing server..')
    //process.exit()//will always exit all event loop
    const url = req.url
    const method = req.method
    if (url=='/') {
        res.write('<html>')
        res.write("<head><title>My first message</title></head>");
        res.write('<body><form action="/message" method="POST"><label>Username</label><input type="text" name="username"/><button type="submit">Submit</button></form></body > ')
        res.write("</html>");
        return res.end
    }
    
    if (url === '/message' && method === 'POST') {
      //getting the form data and writing it to a text file

      const receivedData = [];
      //add a listerner to listen to data event(when data is available) on post request
        req.on("data", (chunk) => {
            console.log('chunk', chunk);
            console.log(chunk.toString())

            //for large file data, you push available data to receivedData array
        receivedData.push(chunk);
      });
        
      // Add a listener to the 'end' event to process the received data
       return  req.on("end", () => {
          //concatenate multiple buffers in the receivedData array into a single buffer
          const receivedText = Buffer.concat(receivedData).toString();
            console.log("Received Data:", receivedText);
            const message = receivedText.split('=')[1]
          fs.writeFile('userInputData.txt', message, (err) => {
            //setting header to redirect to homepage and status code to 302
            res.writeHead(302, {
              Location: "/",
            });

            return res.end();
          })
            log(message)
         })
    
      
    }

    res.setHeader('Content-Type', 'text/html')
    res.write("<html>");
    res.write("<head><title>My first message</title></head>");
    res.write('<body><h1>A WELCOME MESSAGE</h1></body>');
    res.write("</html>");
res.end()
})

server.listen(3000,()=>console.log('Server is running on Port:3000'))