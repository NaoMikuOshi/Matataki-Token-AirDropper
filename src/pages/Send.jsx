import React from "react";
import { Form, Container, Button, Notification } from "react-bulma-components";
import { Formik } from 'formik';
const { Field, Control, Label, Input, Radio } = Form


export default function Send() {
    return <div className="send">
<Container>
    <h1 className="title">Send Airdrop</h1>
    <Formik
      initialValues={{ title: '', quantity: '', total: '', split: 'Equal' }}
      validate={values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } else if (isNaN(values.quantity)) {
          errors.quantity = 'Invalid quantity';
        } else if (isNaN(values.total)) {
          errors.total = 'Invalid total amount';
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
        <form onSubmit={handleSubmit}>
           <Field>
                <Label>Title</Label>
                <Control>
                <Input placeholder="Title of this Token Airdrop..." onChange={handleChange}
                    onBlur={handleBlur} value={values.title} name="title" />
                      {
                        errors.title && touched.title 
                        && <Notification color="danger">{errors.title}</Notification>
                      }
                </Control>
          </Field>
          <Field>
                <Label>How many 👤</Label>
                <Control>
                <Input placeholder="Quantity" onChange={handleChange}
                    onBlur={handleBlur} value={values.quantity} name="quantity" />
                {
                  errors.quantity && touched.quantity && <Notification color="danger">{errors.quantity}</Notification>
                }
                </Control>
          </Field>
          <Field>
                <Label>How much in Total?</Label>
                <Control>
                <Input placeholder="Total Amount" onChange={handleChange}
                    onBlur={handleBlur} value={values.total} name="total" />
                    {
                      errors.total && touched.total && <Notification color="danger">{errors.total}</Notification>
                    }
                </Control>
          </Field>
          <Field>
              <Label>Which way to split?</Label>
              <Control>
                <Radio onChange={handleChange} onBlur={handleBlur} checked={values.split === 'Equal'} value="Equal" name="split">
                    Equally
                </Radio>
                <Radio onChange={handleChange} onBlur={handleBlur} checked={values.split === 'Random'} value="Random" name="split" >
                    Random
                </Radio>
              </Control>
            </Field>
            <Button color="primary" disabled={isSubmitting}>Submit</Button>
        </form>
      )}
    </Formik>
    </Container>
  </div>
}