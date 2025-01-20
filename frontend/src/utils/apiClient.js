import axios from "axios";

const baseUrl = window.location.origin;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
