import React, { useContext } from "react";
import styles from "../styles/Home.module.css";

import {AuthContext} from '../context/index'
import {useRouter} from "next/router";

import withAuth from "./HOC/withAuth.jsx";

function Test() {
  return (
    <>
<div className="container">
ds
</div>
   
    </>
  );
}

export default  withAuth(Test);
