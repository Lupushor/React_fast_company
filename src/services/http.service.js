import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : [];
}

axios.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      toast.error("Something went wrong");
      // toast("Unexpected error", error);
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
