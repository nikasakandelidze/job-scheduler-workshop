const { default: axios } = require("axios");

//this host ip fetching mechanisms might be replaced with service registration mechanism for dynamic
// data fetching.
const data = {
  user: "http://localhost:8081",
  admin: "http://localhost:8082",
};

const getHostIpPortForServiceId = async (serviceTag) => {
  const urlToHealthCheck = `${data[serviceTag]}/health-check`;
  return urlToHealthCheck;
};

exports.getHostIpPortForServiceId = getHostIpPortForServiceId;
