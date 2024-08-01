console.log("hello world");

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use("/", routes);

app.get("/", (req, res) => {
  res.json("test working");
});

app.listen(5050, () => {
  console.log("server running at port 5050");
});
