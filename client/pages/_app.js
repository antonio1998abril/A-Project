import { useRouter } from "next/router";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataProvider } from "../context/index";
import Header from "../components/Header";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showBarLogin = router.pathname === "/" ? true : false;
  const showBarRegister = router.pathname === "/register" ? true : false;

  return (
    <>
      <DataProvider>
        <div className="main">
          {!showBarLogin && !showBarRegister && (
            <>
              <Header />
            </>
          )}
          <Component {...pageProps} />
        </div>
      </DataProvider>
    </>
  );
}

export default MyApp;
