import { useRouter } from "next/router";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataProvider } from "../context/index";
import Header from "../components/Header";
import { SSRProvider } from "react-bootstrap";
import Success from "../components/Alert/Success";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showBarLogin = router.pathname === "/" ? true : false;
  const showBarRegister = router.pathname === "/register" ? true : false;

  return (
    <>
      <SSRProvider>
        <DataProvider>
          <div className="main">
            {!showBarLogin && !showBarRegister && (
              <>
                <Header />
              </>
            )}
             <Success />
            <Component {...pageProps} />
          </div>
        </DataProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
