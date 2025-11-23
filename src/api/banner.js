import api from "./api.js";

var baseUrl = "/banner";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function getAllBanner() {
  return api.get(getUrl("/"));
}

const banner = { getAllBanner };
export default banner;
