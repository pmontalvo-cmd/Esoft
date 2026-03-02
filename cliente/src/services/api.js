import axios from "axios";
import { getLang } from "../i18n";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const lang = getLang(); // "es" o "en"
  config.params = { ...(config.params || {}), lang };
  return config;
});

export default API;
