import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { AuthContext } from "../context";
import verifyAuth from "./HOC/verifyAuth.jsx";

function Register() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    lastName: "",
    role: "",
  };
  const [register, setRegister] = useState(initialState);
  const state = useContext(AuthContext);
 

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { ...register });
      localStorage.setItem("firstLogin", true);
      Router.push("/dashboard");
      /*       swal({ icon: "success", text: "GOOD!!", timer: "2000" }).then(
        function () {
          window.location.href = "/";
        },
        2000
      ); */
    } catch (err) {
      /* swal({
        title: "ERROR",
        text: err.response.data.msg,
        icon: "error",
        button: "OK",
      }); */
    }
  };

  return (
    <div className="limiter">
      <div className="container-register100">
        <div className="wrap-register100">
          <form
            className="register100-form "
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                Register
              </div>
              <div className="card-body">
                <Row className="mb-4">
                  <Form.Group className="mb-4">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="email"
                      type="email"
                      placeholder=" Type your email, it can be also a fake email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="name"
                      type="text"
                      placeholder=" What is your name?"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="lastName"
                      type="text"
                      placeholder="Also write your lastName"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Role: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="role"
                      type="text"
                      placeholder="What is your role in your company?"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 ">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="password"
                      type="password"
                      placeholder="Create a new password"
                      autoComplete="on"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 ">
                    <Form.Label>Password Again: </Form.Label>
                    <Form.Control
                      onChange={handleChangeInput}
                      name="repeatPassword"
                      type="password"
                      placeholder="Write the password again"
                      autoComplete="on"
                    />
                  </Form.Group>
                
                    <button
                      type="submit"
                      className="btn btn-primary btn-block  "
                    >
                      Register
                    </button>
                  
                  <div className="text-center p-t-46 ">
                    <Link href="/">
                      <a className="txt2">or Login</a>
                    </Link>
                  </div>
                </Row>
              </div>
            </div>
          </form>
          <div className="register100-more" />
        </div>
      </div>
    </div>
  );
}

export default verifyAuth(Register);
