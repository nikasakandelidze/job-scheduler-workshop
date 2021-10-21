const express = require("express");
const core = require("./core");

var app = express();

//Start periodically checking the health of service with the id of health-check-service-id
app.all("/api/healthcheck/:service-tag", async (req, resp) => {
  console.log("Got request to healthcheck scheduling initialiser endpoint");
  const serviceTag = req.params["service-tag"];
  const result = await core.scheduleHealthCheckEveryHour(serviceTag);
  if (result.status === "OK") {
    resp.sendStatus(200);
  } else {
    resp.send(result.errorMessage);
  }
});

app.listen(8083, () => {
  console.log("started scheduling service app on port 8083");
});
