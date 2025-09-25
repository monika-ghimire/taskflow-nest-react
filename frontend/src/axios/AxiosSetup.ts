import axios from "axios";

const token : string = "";
const custom_axios = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL, // use CRA env variable
baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    Authorization: "Bearer " + token,
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default custom_axios;
