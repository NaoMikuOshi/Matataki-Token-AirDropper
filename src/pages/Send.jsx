import React from "react";
import { Form, Container, Button, Notification } from "react-bulma-components";
import { Formik } from "formik";
import { createAirdrop } from "../api/backend";
const { Field, Control, Label, Input, Radio } = Form;

export default function Send() {
  return (
    <div className="send">
      <Container>
        <h1 className="title">Send Airdrop</h1>
        <Formik
          initialValues={{
            title: "",
            quantity: "",
            amount: "",
            split: "Equal",
            duration: "0",
            tokenId: "0",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            } else if (isNaN(values.quantity)) {
              errors.quantity = "Invalid quantity";
            } else if (isNaN(values.amount)) {
              errors.amount = "Invalid total amount";
            } else if (isNaN(values.duration)) {
              errors.quantity = "Invalid day";
            } else if (isNaN(values.tokenId)) {
              errors.tokenId = "Invalid TokenID";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await createAirdrop(
              values.title,
              parseInt(values.tokenId),
              parseInt(values.amount),
              parseInt(values.quantity),
              parseInt(values.duration)
            );
            console.log(result);
            setSubmitting(false);
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
                  <Input
                    placeholder="Title of this Token Airdrop..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    name="title"
                  />
                  {errors.title && touched.title && (
                    <Notification color="danger">{errors.title}</Notification>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>
                  How many{" "}
                  <span role="img" aria-label="peoples">
                    👤
                  </span>
                </Label>
                <Control>
                  <Input
                    placeholder="Quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                    name="quantity"
                  />
                  {errors.quantity && touched.quantity && (
                    <Notification color="danger">
                      {errors.quantity}
                    </Notification>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>How much in Total?</Label>
                <Control>
                  <Input
                    placeholder="Total Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    name="total"
                  />
                  {errors.amount && touched.amount && (
                    <Notification color="danger">{errors.amount}</Notification>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Which way to split?</Label>
                <Control>
                  <Radio
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.split === "Equal"}
                    value="Equal"
                    name="split"
                  >
                    Equally
                  </Radio>
                  <Radio
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.split === "Random"}
                    value="Random"
                    name="split"
                  >
                    Random
                  </Radio>
                </Control>
              </Field>
              <Button color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
