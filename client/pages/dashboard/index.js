import React, { useContext } from 'react'
import {useRouter} from "next/router";
import { AuthContext } from '../../context';
import withAuth from "../HOC/withAuth.js";

function Index() {
  return (
    <div> Dashboard Index</div>
  )
}

export default withAuth(Index);