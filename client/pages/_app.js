import Router from "next/router";
import { useRouter } from "next/router";
import { DataProvider } from "../context/index";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
