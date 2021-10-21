const cron = require("node-cron");
const serviceRegistry = require("./serviceRegistry");

const setOfInProgressHealthchecks = new Set();

const scheduleHealthCheckEveryHour = async (serviceTagToCheck) => {
  const errorMessage = "";
  cron.schedule("* * * * * *", async () => {
    if (
      !serviceTagToCheck ||
      setOfInProgressHealthchecks.has(serviceTagToCheck)
    ) {
      errorMessage = `Healthcheck for Service tag ${serviceTagToCheck} can't be scheduled.`;
      console.log(errorMessage);
      return;
    }
    console.log(`scheduling Job for healthcheck of:  ${serviceTagToCheck}`);
    setOfInProgressHealthchecks.add(serviceTagToCheck);
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
    } finally {
      console.log(
        `removing ${serviceTagToCheck} tag from set of scheduled tags`
      );
      setOfInProgressHealthchecks.delete(serviceTagToCheck);
    }
  });
  return { status: "OK" };
};

exports.scheduleHealthCheckEveryHour = scheduleHealthCheckEveryHour;
