export const API_PATH = {
  ACCOUNT: {
    SIGNIN: "/auth/signin",
    REGISTER: "/users/create",
    PROFILE: "/auth/profile",
  },
  CATEGORY: {
    GET: "/categories",
  },
  POST: {
    CREATE: "/posts/create",
    GET_ONE_BY_ID: (id) => `/posts/${id}`,
  },
  ADDRESS: {
    PROVINCE: "/provinces",
    DISTRICT: (id) => `/district/?province=${id}`,
  },
  MOTORBIKE: {
    BRAND: "/brands",
    MODEL: "/models",
  },
  NOTIFICATION: {
    GET_ALL: "notifications/list",
    COUNT_UNREAD: "notifications/unread/count",
  },
};
