import { useEffect, useState, createContext } from "react";
import User from "../pages/api/user";
import { commonService } from "../service/HttpNoTokenRequired/commonService";

const initialToken = {
  token: ''
}


export const AuthContext = createContext(initialToken)
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const {getRefreshToken} = commonService();

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
/*     if (firstLogin) { */
      const refreshToken = async () => {
        try {
          /* const res = await axios.get("/api/refresh_token"); */
          /*  await getRefreshToken().then((res)=> {
            if (res.status === 200) {
              setToken(res.data.accessToken);
            } 
          }).catch(function(e) {
            console.log("error");
          }) */

          const res=  await getRefreshToken()
          if (res.status === 200)
            setToken(res.data.accessToken);
          

/* 
          axios.get('/api/refresh_token', {
            validateStatus: function (status) {
              if (status === 200) {
                setToken(res.data.accessToken);
              } 
              return status < 500; 
            }
          }) */
    
         
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
