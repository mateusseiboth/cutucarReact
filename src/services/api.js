import axios from "axios";
import { API_BASE_URL } from "../config/constant";

const api = axios.create({
  baseURL: API_BASE_URL,
});

function getToken() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return null;
  }
}

const headers = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

class cutucarApi {
  async get(url) {
    return api.get(url, headers);
  }
  async post(url, data) {
    return api.post(url, data, headers);
  }
  async put(url, data) {
    return api.put(url, data, headers);
  }
  async delete(url) {
    return api.delete(url, headers);
  }
}

export default new cutucarApi();
