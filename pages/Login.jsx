import React, { useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { useRouter, Router } from 'next/router'
import { useStore } from "../store";
import { Formik } from "formik";
import { Container, Notification, Form, Button } from "react-bulma-components";
import { loginWithEmail } from "../api/user";
import { setOAuthRedirectUri } from "../api/developer";
import Navigation from "../components/Navigation";
import Head from 'next/head'
import axios from "axios";

const { Field, Control, Label, Input } = Form;

export default function Login({ user }) {
  const store = useStore();
  // const router = useHistory();
  // let location = useLocation();
  const router = Router;
  const useroute = useRouter();
  let location = useroute.query;
  let { from } = location.state || { from: { pathname: "/" } };
  const [errorMsg, setError] = useState({
    code: 0,
  });

  // if (store.get("accessToken")) {
  //   router.replace(from);
  // }

  let small = {
    marginTop: "0.5rem",
  };

  let mid = {
    marginTop: "1.5rem",
  };

  const jumpToMttkOAuth = async () => {
    if (from.pathname !== "/") {
      const result = await setOAuthRedirectUri(from.pathname);
      console.log("set redirect uri result:", result.data);
    }
    window.location = process.env.REACT_APP_OAuthUrl;
  };

  return (
    <div>
      <Head>
        <title>{user}</title>
        <meta property='og:site_name' content='瞬MATATAKI' />,
        <meta property='og:title' content='瞬MATATAKI' />,
        <meta property='og:tyle' content='article' />,
        <meta property='og:url' content='www.baidu.com' />,
        <meta property='og:image' content={user} />,
        <meta property='og:site_name' content={user} />,
      </Head>
      <Navigation />
      <Container className="send" style={mid}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.password) {
              errors.password = "Password Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // clear error state
            setError({ code: 0 });
            // do something with values
            console.log(values);
            loginWithEmail(values.email, values.password).then((result) => {
              console.log(result);
              if (result.code !== 0) {
                setError(result);
                setSubmitting(false);
              } else {
                // store.set("accessToken")(result.data);
                router.replace(from);
              }
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div
              className="panel is-primary"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              <p className="panel-heading">
                Login with Matataki Account
                {from.pathname !== "/" && " to continue"}
              </p>
              <div className="panel-block">
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Field>
                    <Label>Email</Label>
                    <Control>
                      <Input
                        placeholder="Your Matataki account's Email address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        type="email"
                      />
                      {errors.email && touched.email && (
                        <Notification color="danger">{errors.email}</Notification>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Password</Label>
                    <Control>
                      <Input
                        placeholder="Your Matataki account password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        type="password"
                        name="password"
                      />
                      {errors.password && touched.password && (
                        <Notification color="danger">
                          {errors.password}
                        </Notification>
                      )}
                    </Control>
                  </Field>

                  {errorMsg.code !== 0 && (
                    <Notification color="danger">
                      Error code: {errorMsg.code}, message: {errorMsg.message}
                    </Notification>
                  )}
                  <Button
                    type="button"
                    color="primary"
                    className="is-fullwidth"
                    onClick={jumpToMttkOAuth}
                  >
                    One-Click Login / 一键登录
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className="is-fullwidth"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    style={small}
                    className="is-fullwidth"
                    disabled={isSubmitting}
                    onClick={() => (window.location = "https://matataki.io")}
                  >
                    Register
                  </Button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
}

Login.getInitialProps = async (ctx) => {
  const res = await axios.get('http://127.0.0.1:8090');
  // console.log(res);
  return { user: res.data }
}
