import axios from "axios";

// A page-data request that never answers must end in an error the page can
// handle (a retry message), not an endless loading state. Reads are small
// JSON records, so 15 s is far beyond a normal response. Uploads (POST/PUT)
// keep no limit: a CV on a slow connection can legitimately take longer.
const READ_TIMEOUT_MS = 15000;

// The API's error message when there is one; otherwise the original error
// (timeouts and network failures have no response to read a message from).
const failure = (error) => error?.response?.data?.message ?? error;
// import SessionService from "../services/session";

function normalize(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return Object.keys(obj).reduce((result, key) => {
      result[key] = obj[key] === "" || obj[key] === null ? undefined : obj[key];
      return result;
    }, {});
  }
}

// GET Request
async function get(url, data) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api" + url,
      { params: data, timeout: READ_TIMEOUT_MS }
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}

// POST Request
async function post(url, data, options = {}) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api" + url,
      normalize(data),
      {}
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}
async function postMultipart(url, data, options = {}) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api" + url,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}

// PUT Request
async function put(url, data, options = {}) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_API_URL + "/api" + url,
      normalize(data),
      {}
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}
async function putMultipart(url, data, options = {}) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_API_URL + "/api" + url,
      normalize(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}

// PATCH Request
async function patch(url, data) {
  try {
    const response = await axios.patch(
      import.meta.env.VITE_API_URL + "/api" + url,
      data
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}

// DELETE Request
async function del(url, data, options = {}) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_API_URL + "/api" + url,
      { params: data }
    );
    return response.data;
  } catch (error) {
    throw failure(error);
  }
}

const api = { get, post, putMultipart, postMultipart, put, patch, del };

export default api;
