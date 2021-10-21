const express = require("express");
const core = require("./core");
const bodyParser = require("body-parser");
var app = express();

//Start periodically checking the health of service with the id of health-check-service-id
app.get("/healthcheck/:servicetag", async (req, resp) => {
  console.log("Got request to healthcheck scheduling initialiser endpoint");
  const serviceTag = req.params["servicetag"];
  const result = await core.scheduleHealthCheckEveryHour(serviceTag);
  if (result.status === "OK") {
    resp.sendStatus(200);
  } else {
    resp.sendStatus(503);
  }
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(8083, () => {
  console.log("started scheduling service app on port 8083");
});
