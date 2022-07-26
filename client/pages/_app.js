import Router from "next/router";
import { useRouter } from "next/router";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataProvider } from "../context/index";



function MyApp({ Component, pageProps }) {

  return (
  <>
    <DataProvider>
      <div className="main">
        <Component {...pageProps} />
      </div>
    </DataProvider>
  </>
  )

  /* return <Component {...pageProps} /> */
}

export default MyApp;
