const express = require("express");

const app = express();

app.get("/api/health-check", (req, res) => {
  res.sendStatus(200);
});

app.listen(8082, () => {
  console.log("started admin-service app on port 8082");
});
