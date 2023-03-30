const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSantize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(xss());
app.use(mongoSantize());

app.get("/", (req, res) => {
  res.status(200).json("Dumb server is fine, your code isn't :(");
});

// Routes
app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/postRoute"));
app.use('/api', require('./routes/commentRouter'));

const URI = process.env.MONGO_DB;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on port🙉🙉👂 ${port}`);
});
