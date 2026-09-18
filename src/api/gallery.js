import api from "./api.js";

var baseUrl = "/gallery";
const getUrl = (subUrl) => baseUrl + subUrl;

// Only live tiles — the admin-only `all=1` flag is deliberately not sent.
async function getGallery() {
  return api.get(getUrl("/"));
}

const gallery = { getGallery };
export default gallery;
