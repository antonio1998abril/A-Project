import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import { Form, Row } from "react-bootstrap";

const initialState = {
  email: "",
  password: "",
};

export default function Home() {
  const state = useContext(AuthContext);
  const [isLogged] = state.User.isLogged;
  // user Context
  const [login, setLogin] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ ...login });
      await axios.post("/api/login", { ...login });
      localStorage.setItem("firstLogin", true);
      Router.push("/dashboard");
    } catch (err) {}
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
                  </Row>
                </div>
              </div>
            </form>

            <div className="login100-more" />
          </div>
        </div>
      </div>

      {/*   <main className={styles.main}> */}
      {/*  <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}

      {/*     </main> */}

      {/*  <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      {/*  </div>  */}
    </>
  );
}
