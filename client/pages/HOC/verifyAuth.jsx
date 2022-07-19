/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const verifyAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(true);

    useEffect(() => {
      const accessToken = localStorage.getItem("firstLogin");
      if (accessToken) {
        Router.replace("/dashboard");
      } else {
        setVerified(false);
      } 
    
    
    },[]);

    if (!verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default verifyAuth;
