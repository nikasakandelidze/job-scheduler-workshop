const express = require("express");

const app = express();

app.get("/api/health-check", (req, res) => {
  res.sendStatus(200);
});

app.listen(8081, () => {
  console.log("started user-service app on port 8081");
});
