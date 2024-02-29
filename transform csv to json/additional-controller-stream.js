
const fairmoneyCustomerCsvUpload = asyncHandler(async (req, res, next) => {
    try {
      const numberOfRows = parseInt(req.body?.rows, 10) ?? 15000;
      const batchSize = numberOfRows > 0 ? numberOfRows : 15000;
      let rowCount = 0;
      let buffer = [];
      let totalBatches = 0;
      let processedBatches = 0;
      let errorMessageBatchCount = 0;
  
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const filename = req.file.originalname;
      const csvFilePath = req.file.path;
      filename.replace(".csv", ".json");
  
      const batchTransform = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          delete chunk._id;
          buffer.push(chunk);
          rowCount++;
  
          if (rowCount === batchSize) {
            this.push(buffer);
            buffer = [];
            rowCount = 0;
            totalBatches++;
          }
  
          callback();
        },
        flush(callback) {
          if (buffer.length > 0) {
            this.push(buffer);
            totalBatches++;
          }
          callback();
        },
      });
  
      const csvReadStream = fs.createReadStream(csvFilePath);
  
      let errorOccurred = false;
      let errorMessage = "";
      let totalBatcheStream = 0;
      csvReadStream
        .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
        .pipe(batchTransform)
        .on("data", async (batch) => {
          try {
            const requiredFields = [
              "loan_id",
              "loan_instalment_id",
              "signup_phone_number",
              "account_number",
            ];
  
            totalBatcheStream += batch.length;
  
            let invalidRecordCount = 0;
            batch.map((record) => {
              const isValidRecord = requiredFields.every((field) =>
                Object.keys(record).includes(field)
              );
              if (!isValidRecord) {
                invalidRecordCount++;
              }
            });
  
            if (invalidRecordCount > 0) {
              await deleteUpload(csvFilePath, next);
              batchTransform.destroy();
              res.status(500).json({
                error: true,
                message: `invalid records in ${filename}`,
                totalProcessedRows: totalBatcheStream - batch.length,
              });
              return;
            }
            const bulkOps = batch.map((record) => ({
              updateMany: {
                filter: { account_number: record.account_number },
                update: { $set: record },
                upsert: true,
              },
            }));
            await FairmoneyCustomer.bulkWrite(bulkOps, { ordered: false });
  
            processedBatches++;
            if (processedBatches === totalBatches) {
              await deleteUpload(csvFilePath, next);
              res.json({
                success: true,
                message: `${filename} Conversion successful`,
                totalProcessedRows: totalBatcheStream,
              });
            }
          } catch (error) {
            errorOccurred = true;
            errorMessage = `Error inserting into database: ${error}`;
            errorMessageBatchCount++;
  
            if (errorMessageBatchCount === totalBatches) {
              await deleteUpload(csvFilePath, next);
              batchTransform.destroy();
              res.status(500).json({ error: true, message: errorMessage });
            }
          }
        })
        .on("error", async (error) => {
          errorOccurred = true;
          errorMessage = `Error processing CSV: ${error}`;
          await deleteUpload(csvFilePath, next);
          res.status(500).json({ error: true, message: errorMessage });
        });
    } catch (error) {
      await deleteUpload(csvFilePath, next);
      res.status(500).json({ error: true, message: error });
    }
  });
  