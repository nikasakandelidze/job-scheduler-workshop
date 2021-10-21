const cron = require("node-cron");
const serviceRegistry = require("./serviceRegistry");

const SetOfInProgressHealthchecks = new Set();

const scheduleHealthCheckEveryHour = async (serviceTagToCheck) => {
  const errorMessage = "";
  cron.schedule("*/10 * * * * *", async () => {
    if (
      !serviceTagToCheck ||
      SetOfInProgressHealthchecks.has(serviceTagToCheck)
    ) {
      errorMessage = `Healthcheck for Service tag ${serviceTagToCheck} can't be scheduled.`;
      console.log(errorMessage);
      return;
    }
    console.log(`scheduling Job for healthcheck of:  ${serviceTagToCheck}`);
    SetOfInProgressHealthchecks.add(serviceTagToCheck);
    const url = serviceRegistry.getHostIpPortForServiceId(serviceTagToCheck);
    if (!url) {
      errorMessage = `Healthcheck for Service tag ${serviceTagToCheck} can't be scheduled.`;
      console.log(errorMessage);
      return;
    }
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(
          `Health-check is ok for service with tag ${serviceTagToCheck}`
        );
      } else {
        console.log(
          `Problem with health-check with service with tag ${serviceTagToCheck}`
        );
      }
    } catch (err) {
      errorMessage = `Problem with health-check service with tag ${serviceTagToCheck}`;

      console.log(errorMessage);
    }
  });
  return { status: "OK" };
};

exports.scheduleHealthCheckEveryHour = scheduleHealthCheckEveryHour;
