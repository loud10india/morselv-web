import axios from "axios";
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
      { params: data }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
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
    throw error.response.data.message;
  }
}

const api = { get, post, putMultipart, postMultipart, put, patch, del };

export default api;
