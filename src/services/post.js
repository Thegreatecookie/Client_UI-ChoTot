import { API_PATH } from "../constants";
import instance from "./index";

const Create = (body) => instance.post(API_PATH.POST.CREATE, body);
const GetOneById = (id) => instance.get(API_PATH.POST.GET_ONE_BY_ID, id);
export default {
  Create,
  GetOneById,
};
