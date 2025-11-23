import api from "./api";

var baseUrl = "/provider";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function getNearbyProviders(data) {
  return api.get(getUrl("/nearby"), data);
}
async function getProviderDetails(data) {
  return api.get(getUrl("/id"), data);
}
async function getProvidersByFilter(data) {
  return api.get(getUrl("/filter"), data);
}
async function getProviderCount(data) {
  return api.get(getUrl("/count"), data);
}
async function getSearchResult(data) {
  return api.post(getUrl("/search"), data);
}

const providers = {
  getNearbyProviders,
  getProviderDetails,
  getProvidersByFilter,
  getProviderCount,
  getSearchResult,
};
export default providers;
