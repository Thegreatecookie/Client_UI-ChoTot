import { API_PATH } from "../constants";
import instance from "./index";

const getCategory = (query) =>
  instance.get(API_PATH.CATEGORY.GET, { params: query });

export default {
  getCategory,
};
