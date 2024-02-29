import { API_PATH } from "../constants";
import instance from "./index";

const Signin = (body) => instance.post(API_PATH.ACCOUNT.SIGNIN, body);
const Register = (body) => instance.post(API_PATH.ACCOUNT.REGISTER, body);
export default {
  Signin,
  Register,
};
