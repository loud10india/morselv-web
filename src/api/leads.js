import api from "./api.js";

var baseUrl = "/leads";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function addBookings(data) {
  return api.post(getUrl("/"), data);
}

const leads = { addBookings };
export default leads;
