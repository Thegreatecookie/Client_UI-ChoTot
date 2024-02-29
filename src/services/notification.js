import { API_PATH } from "../constants";
import instance from "./index";

const GetAll = (signal) =>
  instance.get(API_PATH.NOTIFICATION.GET_ALL, { signal }).catch((err) => {});

const CountUnread = () =>
  instance.get(API_PATH.NOTIFICATION.COUNT_UNREAD).catch((err) => {});

export default {
  GetAll,
  CountUnread,
};
