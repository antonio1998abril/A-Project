/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem("firstLogin");
      if (!accessToken) {
        Router.replace("/");
      } else {
        setVerified(true);
      } 
    
    
    },[]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
