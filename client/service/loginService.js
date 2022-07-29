import { HttpService } from "./HttpService";

export const loginService = () => {
  const { post, get } = HttpService();

  const getLogOut = () => {
    const url = `/login`;
    return get(url, "logOut", {});
  };

  const getRefreshToken = () => {
    const url = `/api/refresh_token`;
    return get(url, "refreshToken", {});
  };

  const getInfoUser = () => {
    const url = `/api/info`;
    return get(url, "getInfo", {});
  };


  return {
    getLogOut,
    getRefreshToken,
    getInfoUser,
  };
};
