import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import User from "../pages/api/user";
import { loginService } from "../service/loginService";

const initialToken = {
  token: ''
}

export const AuthContext = createContext(initialToken)
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const {getRefreshToken} = loginService();

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
/*     if (firstLogin) { */
      const refreshToken = async () => {
        try {
          /* const res = await axios.get("/api/refresh_token"); */
          const res = await getRefreshToken()
    
          setToken(res.data.accessToken);
          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };
      refreshToken();
  /*   } */
  }, []);

  const state = {
    token: [token, setToken],
    User: User(token),
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
