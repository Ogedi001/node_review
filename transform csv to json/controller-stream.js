// some logic are missing
//use of transform stream


const { fileUploader } = require("../middleware/upload");
const csv = require("fast-csv");

const { uploadType } = require("../utils/file-upload");
const { deleteUpload } = require("../utils/delete-upload");

const path = require("path");
const { Transform } = require("stream");
const fs = require("fs");
const AccessCardCustomer = require("../models/AccessCardCustomer");


const accessCardCustomerJsonUpload = async (req, res, next) => {

  console.log(req.body)
 // console.log(req.body.rows)
  const numberOfRows = parseInt(req.body?.rows, 10) ?? 20000;
  //console.log(numberOfRows)
  
  const batchSize = numberOfRows > 0 ? numberOfRows : 20000; // Number of rows per chunk
 // Number of rows per chunk
 console.log(batchSize)
  let rowCount = 0;
  let buffer = [];

  await fileUploader(uploadType.file)(req, res);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const jsonDirectoryPath = path.join(__dirname, "../resources/json/");
  // Convert CSV to JSON
  const csvFilePath = req.file.path;
  const jsonFileName = req.file.originalname.replace(".csv", ".json");
  const jsonFilePath = path.join(jsonDirectoryPath, jsonFileName);

  // Create a custom Transform stream
  const batchTransform = new Transform({
    objectMode: true, // Emit objects rather than binary data
    transform(chunk, encoding, callback) {
      buffer.push(chunk); // Push each row to the buffer
      rowCount++;

      // If the buffer reaches the desired batchSize, emit it downstream
      if (rowCount === batchSize) {
        this.push(buffer);
        buffer = []; // Clear the buffer
        rowCount = 0; // Reset the row count
      }

      callback();
    },
    flush(callback) {
      // Emit any remaining rows in the buffer
      if (buffer.length > 0) {
        this.push(buffer);
      }
      callback();
    },
  });

  // Create a read stream from the CSV file
  const csvReadStream = fs.createReadStream(csvFilePath);

  // Pipe the read stream through fast-csv and the custom batchTransform
  csvReadStream
    .pipe(csv.parse({ headers: true })) // Parse the CSV into objects
    .pipe(batchTransform) // Apply the custom Transform stream
    .on("data", async (batch) => {
      // Process each batch of rows here
      console.log(batch);
      //const result = await AccessCardCustomer.insertMany(batch)
    })
    .on("end", async() => {
      console.log("CSV processing complete");
      await deleteUpload(csvFilePath, next);
    })
    .on("error", (error) => {
      return res.status(500).json({ error: "Error processing CSV:"});
    })

    res.json({
      success: true,
      message: "Conversion successful",
      filename: jsonFileName,
    });
};


module.exports = {
  accessCardCustomerJsonUpload: accessCardCustomerJsonUpload,
};
