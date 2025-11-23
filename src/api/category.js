import api from "./api.js";

var baseUrl = "/category";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function getAllCategory() {
  return api.get(getUrl("/"));
}

const category = {
  getAllCategory,
};
export default category;
