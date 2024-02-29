import { API_PATH } from "../constants";
import instance from "./index";

const Brand = (query) =>
  instance.get(API_PATH.MOTORBIKE.BRAND, { params: query });
const Model = (query) =>
  instance.get(API_PATH.MOTORBIKE.MODEL, { params: query });
export default {
  Brand,
  Model,
};
