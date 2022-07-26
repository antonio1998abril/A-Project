import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import User from "../pages/api/user";

export const AuthContext = createContext()
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        try {
          const res = await axios.get("/api/refresh_token");
          setToken(res.data.accessToken);

          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);
        } catch (err) {
/*           Swal({
            title: "Error try it again",
            text: err.response.data.msg,
            icon: "error",
            button: "OK",
          }); */
          localStorage.removeItem("firstLogin");
        }
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    User: User(token),
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
