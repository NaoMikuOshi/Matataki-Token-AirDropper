import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Panel, Button, Heading } from "react-bulma-components";
import { getDetailOfAirdrop, stopAirdrop } from "../api/backend";
import { getUserProfile } from "../api/user";
import { getTokenProfile } from "../api/token";

function Loading() {
  return (
    <div className="is-loading has-text-centered">
      <span role="img" aria-label="airdrop" style={{ fontSize: "64px" }}>
        🪂
      </span>
      <Heading renderAs="p">Loading Infomation about this airdrop</Heading>
      <Heading subtitle renderAs="p">
        please wait for the server response...
      </Heading>
    </div>
  );
}

function StopAirdropPage() {
  const { cashtag } = useParams();
  const [detail, setDetail] = useState(null);
  const [owner, setOwner] = useState(null);
  const [token, setToken] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    async function fetch() {
      try {
        const _detail = await getDetailOfAirdrop(cashtag);
        setDetail(_detail);
        const [ownerProfile, tokenProfile] = await Promise.all([
          getUserProfile(_detail.owner),
          getTokenProfile(_detail.token_id),
        ]);
        setOwner(ownerProfile.data);
        setToken(tokenProfile.data.token);
      } catch (error) {
        setErr(error);
      }
    }
    fetch();
  }, [cashtag]);
  const loading = !detail || !owner || !token;

  const [stopResult, updateStop] = useState(null);
  async function stopTheAirdrop() {
    const result = await stopAirdrop(cashtag);
    updateStop(result);
  }

  if (loading) {
    return <Loading />;
  } else if (err && err.response.status === 404) {
    return (
      <div className="error">
        <Heading>Airdrop Not found</Heading>
        <Heading subtitle>
          Please checkout your link, or refresh this page.
        </Heading>
        <Link to="/">
          <Button className="is-rounded">Go home</Button>
        </Link>
      </div>
    );
  } else {
    if (detail.status !== "active") {
      return <EventAlreadyStopped />;
    }
    if (stopResult) {
      return <StopSuccessfully />;
    }
    return (
      <Panel
        style={{ maxWidth: "720px", margin: "10px auto" }}
        className="has-text-centered"
        color="primary"
      >
        <Panel.Header>Are you sure to stop airdrop: ${cashtag}?</Panel.Header>
        <div className="panel-body" style={{ padding: "10px" }}>
          <div className="status">
            <h2 className="subtitle is-4">You can take back</h2>
            <h1 className="title balance">
              {detail.balance / 10 ** token.decimals}
              <span className="symbol">{token.symbol}</span>
            </h1>
            <h3 className="subtitle is-4">if you STOP this airdrop.</h3>
          </div>
          <button className="button is-danger" onClick={() => stopTheAirdrop()}>
            STOP and Get the money BACK
          </button>
          {stopResult && JSON.stringify(stopResult)}
        </div>
      </Panel>
    );
  }
}

function EventAlreadyStopped() {
  return (
    <div className="error">
      <p className="description">
        Sorry, but this airdop was stopped/finished already.
      </p>
      <button className="button" onClick={() => window.close()}>
        {" "}
        Close{" "}
      </button>
    </div>
  );
}

function StopSuccessfully() {
  return (
    <div className="success has-text-centered">
      <h1 className="title">Airdrop was stopped successfully</h1>
      <p className="description">
        the remain part will be refund to your matataki account.
        <br />
        It may takes up to 30 minutes to arrive at your account, so please wait
        in patient.
      </p>
      <button className="button" onClick={() => window.close()}>
        {" "}
        Close{" "}
      </button>
    </div>
  );
}

export default StopAirdropPage;
