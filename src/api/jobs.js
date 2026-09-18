import api from "./api.js";

var baseUrl = "/jobs";
const getUrl = (subUrl) => baseUrl + subUrl;

// Only live openings — the admin-only `all=1` flag is deliberately not sent.
async function getOpenings() {
  return api.get(getUrl("/openings"));
}

// multipart/form-data: carries the CV file alongside the text fields.
async function submitApplication(formData) {
  return api.postMultipart(getUrl("/applications"), formData);
}

const jobs = { getOpenings, submitApplication };
export default jobs;
