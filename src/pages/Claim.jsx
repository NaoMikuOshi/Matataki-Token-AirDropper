import React, { useState } from "react";
import "./claim.scss";
import { useRequest } from "ahooks";
import { useStore } from "../store";
import { useParams, Link } from "react-router-dom";
import { Container, Heading, Button } from "react-bulma-components";
import {
  getDetailOfAirdrop,
  claimAirdrop,
  checkIsClaimed,
} from "../api/backend";
import { getUserProfile } from "../api/user";
import { getTokenProfile } from "../api/token";
import { ClaimLogs } from "../components/ClaimLogs";
import Avatar from "../components/Avatar";

// const AIRDROP_TYPE = {
//   WAIT_FOR_QUERY: "wait",
//   EQUAL: "equal",
//   RANDOM: "random",
// };

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

export default function Claim() {
  const { cashtag } = useParams();
  async function getAirdrop() {
    const detail = await getDetailOfAirdrop(cashtag);
    const [ownerProfile, tokenProfile] = await Promise.all([
      getUserProfile(detail.owner),
      getTokenProfile(detail.token_id),
    ]);
    const owner = ownerProfile.data;
    const token = tokenProfile.data.token;
    return { detail, owner, token };
  }
  const { data, error, loading } = useRequest(getAirdrop);

  if (error && error.response.status === 404) {
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
  } else if (loading) {
    return <Loading />;
  }
  return (
    <Container
      className="has-text-centered panel is-primary"
      style={{ maxWidth: "650px", margin: "10px auto" }}
    >
      <p className="panel-heading">
        Air Drop of Total {data.detail.amount / 10000} {data.token.symbol}
      </p>
      <div className="panel-body" style={{ padding: "10px" }}>
        <Heading subtitle renderAs="p">
          Sent to you by
        </Heading>
        <div className="user-card">
          <div className="avatar is-flex is-horizontal-center">
            <Avatar size={128} location={data.owner.avatar} />
          </div>
          <Heading size={5}>
            {data.owner.nickname || data.owner.username}
          </Heading>
        </div>
        <MyClaim
          cashtag={cashtag}
          token={data.token}
          style={{ margin: "10px" }}
        />
        <div
          className="panel is-info"
          style={{ maxWidth: "600px", margin: "10px auto" }}
        >
          <p className="panel-heading">Records of Claim</p>
          <ClaimStat {...data.detail} />
          <ClaimLogs cashtag={cashtag} token={data.token} />
        </div>
      </div>
    </Container>
  );
}

function MyClaim({ cashtag, token }) {
  const [isSendingClaim, updateLoading] = useState(false);
  const { data, loading, error } = useRequest(() => checkIsClaimed(cashtag));
  const [claimResult, updateClaimResult] = useState(null);
  const isClaimed = data && data.isClaimed;

  const claimButtonText = (() =>
    loading
      ? "Checking with server..."
      : isClaimed
      ? "Claimed"
      : isSendingClaim
      ? "Sending request, hold on..."
      : "Claim")();

  async function clickToClaim() {
    updateLoading(true);
    const result = await claimAirdrop(cashtag);
    updateClaimResult(result);
    updateLoading(false);
  }

  if (claimResult) {
    return (
      <div className="results">
        <Heading size={4}>
          <span role="img" aria-label="cheer">
            🎉
          </span>{" "}
          Congratulations!{" "}
          <span role="img" aria-label="cheer">
            🎉
          </span>
        </Heading>
        <Heading subtitle renderAs="p" size={6}>
          You just got {claimResult.amount / 10000} {token.symbol} from this
          Airdrop.
        </Heading>
        <p className="tips">
          Your requested airdrop is in line.
          <br /> Will be drop in your Matataki Wallet soon.
        </p>
      </div>
    );
  } else {
    return (
      <div className="actions">
        <Button
          className="is-rounded is-primary"
          onClick={(e) => clickToClaim()}
          disabled={isClaimed || isSendingClaim}
        >
          {claimButtonText}
        </Button>
      </div>
    );
  }
}

function ClaimStat({ claimed, quantity }) {
  const remain = quantity - claimed;
  return (
    <p className="panel-block">
      Claimed:{" "}
      <code>
        {" "}
        {claimed}/{quantity}{" "}
      </code>
      , Remain:{" "}
      <code>
        {" "}
        {remain}/{quantity}{" "}
      </code>
    </p>
  );
}
