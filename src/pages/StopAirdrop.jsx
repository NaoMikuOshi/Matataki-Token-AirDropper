import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Panel, Button, Heading } from "react-bulma-components";
import { getDetailOfAirdrop } from "../api/backend";
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
          <button className="button is-danger">
            STOP and Get the money BACK
          </button>
        </div>
      </Panel>
    );
  }
}

export default StopAirdropPage;
