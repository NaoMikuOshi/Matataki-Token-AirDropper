import React, { useState } from "react";
import { useStore } from "../store";
import { setCookie } from "../utils/cookie";
import { Formik } from "formik";
import { Container, Notification, Form, Button } from "react-bulma-components";
import { loginWithEmail } from "../api/user";

const { Field, Control, Label, Input } = Form;

export default function Login() {
  const store = useStore();
  const [errorMsg, setError] = useState({
    code: 0,
  });
  return (
    <Container className="send">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
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
            } else {
              store.set("accessToken")(result.data);
              setCookie("ACCESS_TOKEN", result.data, { expires: 1, path: "/" });
            }
            setSubmitting(false);
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
            <p className="panel-heading">Login with Matataki Account</p>
            <div className="panel-block">
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Field>
                  <Label>Email</Label>
                  <Control>
                    <Input
                      placeholder="Email address"
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
                      placeholder="Email address"
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
                  type="submit"
                  color="primary"
                  className="is-fullwidth"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </Container>
  );
}
