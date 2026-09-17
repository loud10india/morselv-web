import api from "./api.js";

var baseUrl = "/businessEnquiry";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function addBusinessEnquiry(data) {
  return api.post(getUrl("/"), data);
}

const businessEnquiry = { addBusinessEnquiry };
export default businessEnquiry;
