const cron = require("node-cron");
const serviceRegistry = require("./serviceRegistry");

const SetOfInProgressHealthchecks = new Set();

const scheduleHealthCheckEveryHour = async (serviceTagToCheck) => {
  const errorMessage = "";
  cron.schedule("0 * * * *", async () => {
    if (
      !serviceTagToCheck ||
      SetOfInProgressHealthchecks.has(serviceTagToCheck)
    ) {
      errorMessage = `Healthcheck for Service tag ${serviceTagToCheck} can't be scheduled.`;
      console.log(errorMessage);
      return;
    }
    SetOfInProgressHealthchecks.add(serviceTagToCheck);
    const url = serviceRegistry.getHostIpPortForServiceId(serviceTagToCheck);
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
  return { status: "OK", errorMessage };
};

exports.scheduleHealthCheckEveryHour = scheduleHealthCheckEveryHour;
