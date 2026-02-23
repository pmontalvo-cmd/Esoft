import axios from "axios";

console.log("API URL =", process.env.REACT_APP_API_URL);

const api = axios.create({
baseURL: process.env.REACT_APP_API_URL,
});

console.log("axios baseURL =", api.defaults.baseURL);


export default api;