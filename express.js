const express = require("express");
const app = express();

app.use(express.static("programming3"));

app.get("/", (req, res) => {
  res.redirect("p5/index.html");
});

app.listen(3000, () => {
  console.log("Example is running on port 3000");
});