import api from "./api.js";

var baseUrl = "/subCategory";

const getUrl = (subUrl) => {
  return baseUrl + subUrl;
};

async function getAllSubCategory(data) {
  return api.get(getUrl("/"), data);
}

const category = {
  getAllSubCategory,
};
export default category;
