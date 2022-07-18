import React, { useContext } from "react";
import styles from "../styles/Home.module.css";

import {AuthContext} from '../context/index'
import {useRouter} from "next/router";

import withAuth from "./HOC/withAuth.js";

function Login() {
  return (
    <>
<h2>TEST 2</h2>
   
    </>
  );
}

export default  withAuth(Login);
