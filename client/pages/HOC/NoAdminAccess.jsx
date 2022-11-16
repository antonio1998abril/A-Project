import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { commonService } from "../../service/HttpNoTokenRequired/commonService";
import { AuthContext } from "../../context";

const NoAdminAccess=(WrappedComponent) =>{

    return (props) => {
        const Router = useRouter();
        const [verified, setVerified] = useState(false);
        const { getRefreshToken  } = commonService();
        const [returnPage, setReturnPage] = useState(false);
    
        const [role,setRole] = useState({})
    
        const state = useContext(AuthContext);
 
        const [isAdmin] = state.User.isAdmin;
    
        const removeLocalStorage = () => {
          localStorage.removeItem("firstLogin");
        }
        useEffect(() => {
          const firstLogin = localStorage.getItem("firstLogin");
    /*       if (firstLogin) { */
            const refreshToken = async () => {
              try {
                const res = await getRefreshToken();
                
                if (res.status === 200) {
                  setVerified(true);
                  const res2 = await axios.get("/api/role", {
                    headers: { Authorization: res.data.accessToken },
                  });
                 /* const res = await getInfoUser();  */
                  setRole(res2)
                } else {
                  setVerified(false);
                  setReturnPage(true);
                  removeLocalStorage();
                }
                setTimeout(() => {
                  refreshToken();
                }, 10 * 60 * 1000);
              } catch (err) {
                localStorage.removeItem("firstLogin");
              }
            };
            refreshToken();
         /*  } else {
            setReturnPage(true);
          } */
    
          if (returnPage || isAdmin) {
            Router.push("/");
          }
        }, [returnPage,isAdmin]);
    
        if (verified) {
          return <WrappedComponent {...props} role={role}/>;
        } else {
          return null;
        }
      };
  
}

export default NoAdminAccess