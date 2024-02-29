import axios from "axios";

const URL = process.env.REACT_APP_SERVICE_HOST;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use((response) => response.data);

export { default as ACCOUNTAPI } from "./account";
export { default as CATEGORYAPI } from "./category";
export { default as ADDRESSAPI } from "./address";
export { default as MOTORBIKEAPI } from "./motorbike";
export { default as POSTAPI } from "./post";
export { default as NOTIFICATION_API } from "./notification";
export default instance;
