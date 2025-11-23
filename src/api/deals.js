import api from "./api.js";

var baseUrl = "/deals";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function getNearbyDeals(data) {
  return api.get(getUrl("/nearby"), data);
}
async function getDealDetails(data) {
  return api.get(getUrl("/id"), data);
}
async function getDealsByFilter(data) {
  return api.get(getUrl("/filter"), data);
}

const deals = { getNearbyDeals, getDealDetails, getDealsByFilter };
export default deals;
