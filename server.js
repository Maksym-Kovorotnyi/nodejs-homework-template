const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server is runing on host:3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
