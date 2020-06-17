import React from "react";
import { Formik } from 'formik';
import {  Container, Notification, Form, Button } from 'react-bulma-components';

const { Field, Control, Label, Input } = Form


export default function Send() {
    return <Container className="send">
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
        <div class="panel is-primary" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p class="panel-heading">
            Login with Matataki Account
          </p>
          <div class="panel-block">
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Field>
                  <Label>Email</Label>
                  <Control>
                  <Input placeholder="Email address" onChange={handleChange}
                      onBlur={handleBlur} value={values.email} name="email" type="email" />
                        {
                          errors.email && touched.email 
                          && <Notification color="danger">{errors.email}</Notification>
                        }
                  </Control>
              </Field>
              <Field>
                  <Label>Password</Label>
                  <Control>
                  <Input placeholder="Email address" onChange={handleChange}
                      onBlur={handleBlur} value={values.password} type="password" name="password" />
                        {
                          errors.password && touched.password 
                          && <Notification color="danger">{errors.password}</Notification>
                        }
                  </Control>
              </Field>
              
              <Button color="primary" className="is-fullwidth" disabled={isSubmitting}>Login</Button>
            </form>
          </div>
        </div>
      )}
    </Formik>
    </Container>
}