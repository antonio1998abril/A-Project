/* eslint-disable */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loginService } from "../../service/loginService";

const verifyAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const { getRefreshToken } = loginService();
    const [returnPage, setReturnPage] = useState(false);
    
    const removeLocalStorage = () => {
      localStorage.removeItem("firstLogin");
    }
    useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin");
     /*  if (firstLogin) { */
        const refreshToken = async () => {
          await getRefreshToken().then((res) => {
            if (res.status === 200) {
              setVerified(false);
              setReturnPage(true);
            } else {
              setVerified(true);
              setReturnPage(false);
              removeLocalStorage();
            }
          });
        };
        refreshToken();
  /*     } else {
        setVerified(true);
      } */

      if (returnPage) {
        Router.replace("/DashboardSession");
      }
    }, [verified, returnPage]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default verifyAuth;
