const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
require("dotenv").config();

app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server started at ", process.env.PORT);
  });
});
