import axios from "axios";
import { API_BASE_URL } from "../config/constant";
import { Notification } from "../components/notification/notify";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom";

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

class CutucarApi {
  createError(e) {
    console.log(e);
    if (e.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    var g = document.createElement("div");
    g.id = "id-original";
    document.body.appendChild(g);
    console.log(document.getElementById("id-original"));
    const commentDomNode = document.getElementById("id-original");
    const commentRoot = createRoot(commentDomNode);

    commentRoot.render(
      <>
        <Notification
          message="Erro ao processar requisição"
          type="error"
          open={true}
        />
      </>
    );
  }

  async get(url) {
    try {
      const result = await api.get(url, headers);
      console.log(result);
      return result;
    } catch (e) {
      const cutucarError = new CutucarApi();
      console.log(e);
      cutucarError.createError(e);
    }
  }
  async post(url, data) {
    try {
      const result = await api.post(url, data, headers);
      console.log(result);
      return result;
    } catch (e) {
      const cutucarError = new CutucarApi();
      console.log(e);
      cutucarError.createError(e);
    }
  }
  async put(url, data) {
    try {
      const result = await api.put(url, data, headers);
      console.log(result);
      return result;
    } catch (e) {
      const cutucarError = new CutucarApi();
      console.log(e);
      cutucarError.createError(e);
    }
  }
  async delete(url) {
    try {
      const result = await api.delete(url, headers);
      console.log(result);
      return result;
    } catch (e) {
      const cutucarError = new CutucarApi();
      console.log(e);
      cutucarError.createError(e);
    }
  }
}

export default new CutucarApi();
