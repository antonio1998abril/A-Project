import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import withAuth from "../HOC/withAuth.jsx";
import Link from "next/link";

function Index() {
  const state = useContext(AuthContext);
  return (
    <>
       <div className="content-wrap">
      <div> Dashboard Index</div>

      <div className="grid">
<div className="container">
  dsd
</div>
<div>
  AuthContext
</div>

<div>
  del
</div>

<div>
  del 2
</div>

</div>

   







        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </p>
          </div>
        </div>

        <div className="card2">Magic Card</div>

        <div className="content-wrap">
          <div className="card-body col-12">
            <div className="callout callout-info">
              <h6>
                <i className="fas fa-info"></i> Bienvenido:
              </h6>
              <h4>
             test
              </h4>
            </div>
          </div>

          <div className="gridIndex">
            <Link href="/test">
              <div className="card ">
                <div className="titleIndex">
                  <b>dsds</b>
                </div>
              </div>
            </Link>
            <Link href="/test">
              <div className="card  ">
                <div className="titleIndex">
                  <b>sda.</b>
                </div>
              </div>
            </Link>
            <Link href="/test">
              <div className="card a ">
                <div className="titleIndex">
                  <b> dsds.</b>
                </div>
              </div>
            </Link>
            <Link href="/test">
              <div className="card ">
                <div className="titleIndex">
                  <b>ds. </b>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Index);
