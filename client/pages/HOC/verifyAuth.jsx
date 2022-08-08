/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  commonService } from "../../service/HttpNoTokenRequired/commonService";

const verifyAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const { getRefreshToken } = commonService();
    const [returnPage, setReturnPage] = useState(false);
    
    const removeLocalStorage = () => {
      localStorage.removeItem("firstLogin");
    }
    useEffect(() => {
      try{
      const firstLogin = localStorage.getItem("firstLogin");
     /*  if (firstLogin) { */
        const refreshToken = async () => {

         const res=  await getRefreshToken()
             if (res.status === 200) {
              setVerified(false);
              setReturnPage(true);
            } else {
              setVerified(true);
              setReturnPage(false);
              removeLocalStorage();
            }  


 /*            const res = await axios.get('/api/refresh_token', {
              validateStatus: function (status) {

                if (status === 200) {
                  setVerified(false);
                  setReturnPage(true);
                } else {
                  setVerified(true);
                  setReturnPage(false);
                  removeLocalStorage();
                } 

                return status < 500; 
              }
            }) */

        };
       refreshToken()
      }catch(err){
        console.log('err')
      }
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
