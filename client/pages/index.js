import Head from "next/head";
import { useContext, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { Form, Row } from "react-bootstrap";
import verifyAuth from "./HOC/verifyAuth.jsx";
import { AuthContext } from "../context";
import RestorePassWordButton from "../components/ModalComponents/RestorePassword/index.js";
import { commonService } from "../service/HttpNoTokenRequired/commonService.js";


const initialState = {
  email: "",
  password: "",
};

function Home() {
  const state = useContext(AuthContext);
  const [showAlert,setShowAlert] = state.User.alert
  // user Context
  const [login, setLogin] = useState(initialState);
  const { startLogIn } = commonService();
  // Alert


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const res = await startLogIn(login)

      if(res.status!==200){
        setShowAlert({status:true,message:'User and Password incorrect',type:'ERROR',duration:3000,position:'top-right'})
      }else {
        setShowAlert({status:true,message:'Hello again',type:'SUCCESS',duration:10000,position:'top-center'})
        Router.push("/DashboardSession"); 
      }
  };

  return (
    <>
      <Head>
        <title>Antonio Training</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form "
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="card">
                <div className="card-header bg-primary text-white text-center">
                  Login
                </div>
                <div className="card-body">
                  <Row className="mb-4">
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        onChange={handleChangeInput}
                        name="email"
                        className="form-control "
                        type="email"
                        placeholder="Email address"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 ">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={handleChangeInput}
                        name="password"
                        className="form-control "
                        type="password"
                        placeholder="Password"
                        autoComplete="on"
                      />
                    </Form.Group>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary  ">
                        Sign in
                      </button>
                    </div>

                    <div className="text-center p-t-46 ">
                      <Link href="/register">
                        <a className="txt2">o Create a new account</a>
                      </Link>
                    </div>
                    <div className="text-center p-t-46 ">
                      <RestorePassWordButton
                      />
                    </div>
                  </Row>
                </div>
              </div>
            </form>

            <div className="login100-more" />
          </div>
        </div>
      </div>
    </>
  );
}

export default verifyAuth(Home);
