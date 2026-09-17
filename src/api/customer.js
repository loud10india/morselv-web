import api from "./api.js";

var baseUrl = "/customer";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function startVerification(data) {
  return api.post(getUrl("/verify/start"), data);
}

async function confirmVerification(data) {
  return api.post(getUrl("/verify/confirm"), data);
}

const customer = { startVerification, confirmVerification };
export default customer;
