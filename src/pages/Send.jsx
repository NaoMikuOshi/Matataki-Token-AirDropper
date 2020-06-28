import React from "react";
import "./send.scss";
import { Link } from "react-router-dom";
import { Form, Container, Button, Notification } from "react-bulma-components";
import { Formik } from "formik";
import { createAirdrop } from "../api/backend";
import { useState } from "react";
import { getAirdropUrl } from "../utils";
import Clipboard from "clipboard";
const { Field, Control, Label, Input, Radio } = Form;

new Clipboard(".copy-btn");

export default function Send() {
  const [result, updateAirdrop] = useState(null);
  if (result) {
    return <AirDropResult result={result} />;
  }
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
            duration: "",
            tokenId: "",
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
            updateAirdrop(result);
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
                <Label>Token ID</Label>
                <Control>
                  <Input
                    placeholder="Matataki Token ID, pattern like: https://wwwtest.smartsignature.io/token/{tokenId}"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tokenId}
                    name="tokenId"
                  />
                  {errors.tokenId && touched.tokenId && (
                    <Notification color="danger">{errors.tokenId}</Notification>
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
                    name="amount"
                  />
                  {errors.amount && touched.amount && (
                    <Notification color="danger">{errors.amount}</Notification>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Duration</Label>
                <Control>
                  <Input
                    placeholder="How many days this airdrop exist?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                    name="duration"
                  />
                  {errors.duration && touched.duration && (
                    <Notification color="danger">
                      {errors.duration}
                    </Notification>
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
                    disabled
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

function AirDropResult({ result }) {
  return (
    <Container className="airdrop-result">
      <h1 className="title">Your just launched Token Airdrop</h1>
      <h2 className="subtitle">Your airdrop $cashtag is: ${result.cashtag}</h2>
      <p>
        You can copy the link below{" "}
        <span role="img" aria-label="below">
          👇
        </span>{" "}
        and share it somewhere else
      </p>
      <div className="copy-group">
        <Input
          readOnly
          value={getAirdropUrl(result.cashtag)}
          id="share-url-input"
          name="share-url"
        />
        <Button
          color="primary"
          className="copy-btn"
          data-clipboard-target="#share-url-input"
        >
          Copy the link
        </Button>
      </div>
      <p>
        <Link to={`/claim/$${result.cashtag}`}>
          <Button color="primary" className="is-rounded">
            Checkout the Airdrop
          </Button>
        </Link>
      </p>
      <p>
        <Link to="/">
          <Button className="is-rounded">Go home</Button>
        </Link>
      </p>
    </Container>
  );
}
