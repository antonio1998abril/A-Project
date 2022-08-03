/* eslint-disable */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loginService } from "../../service/loginService";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const { getRefreshToken, getInfoUser } = loginService();
    const [returnPage, setReturnPage] = useState(false);

    const removeLocalStorage = () => {
      localStorage.removeItem("firstLogin");
    }
    ///crasg@sdsdf1A
    useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin");
/*       if (firstLogin) { */
        const refreshToken = async () => {
          try {
            const res = await getRefreshToken();
            if (res.status === 200) {
              setVerified(true);

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

      if (returnPage) {
        Router.push("/");
      }
    }, [returnPage]);

    if (verified) {
      return <WrappedComponent verified={verified} {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
