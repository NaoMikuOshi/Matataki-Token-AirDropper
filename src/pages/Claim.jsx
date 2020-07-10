import React, { useState } from "react";
import "./claim.scss";
import { useStore } from "../store";
import { useRequest } from "ahooks";
import { useParams, Link, useLocation } from "react-router-dom";
import { Container, Heading, Button, Loader } from "react-bulma-components";
import {
  getDetailOfAirdrop,
  claimAirdrop,
  checkIsClaimed,
  getClaimLogs,
} from "../api/backend";
import { getUserProfile } from "../api/user";
import { getTokenProfile } from "../api/token";
import { ClaimLog } from "../components/ClaimLogs";
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
          {data.detail.title && (
            <p>And leave a message: “{data.detail.title}”</p>
          )}
        </div>
        <ClaimControl
          cashtag={cashtag}
          token={data.token}
          airdropDetail={data.detail}
          style={{ margin: "10px" }}
        />
        <RecordsOfClaim
          detail={data.detail}
          cashtag={cashtag}
          token={data.token}
        />
      </div>
    </Container>
  );
}

function ClaimControl({ cashtag, token, airdropDetail }) {
  let location = useLocation();
  const [isSendingClaim, updateLoading] = useState(false);
  const { data, loading } = useRequest(() => checkIsClaimed(cashtag));
  const [claimResult, updateClaimResult] = useState(null);
  const isClaimed = data && data.isClaimed;
  const store = useStore();
  const isLogined = Boolean(store.get("accessToken"));
  const isFinished = airdropDetail.quantity <= airdropDetail.claimed;
  const claimButtonText = (() =>
    loading
      ? "Checking with server..."
      : isClaimed
      ? "Claimed"
      : isFinished
      ? "Finished"
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
    if (isLogined) {
      return (
        <div className="actions">
          <Button
            className="is-rounded is-primary"
            onClick={(e) => clickToClaim()}
            disabled={isClaimed || isSendingClaim || isFinished}
          >
            {claimButtonText}
          </Button>
        </div>
      );
    } else {
      return (
        <div className="actions">
          <Link
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          >
            <Button className="is-rounded is-primary">Login to continue</Button>
          </Link>
        </div>
      );
    }
  }
}

function RecordsOfClaim({ detail, token, cashtag }) {
  const style = {
    panel: { maxWidth: "600px", margin: "10px auto" },
    clickable: { cursor: "pointer" },
    loader: {
      width: 128,
      height: 128,
      border: "4px solid #3298dc",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
    },
  };
  const [lastUpdate, setLastUpdate] = useState("");
  const afterSuccessUpdate = () => {
    setLastUpdate(new Date().toLocaleTimeString());
  };
  const { data, error, loading, run } = useRequest(
    () => getClaimLogs(cashtag),
    {
      // pollingWhenHidden: true,
      pollingInterval: 1000 * 60,
      onSuccess: afterSuccessUpdate,
    }
  );

  if (error) {
    return <div>Failed to History of Claimed</div>;
  }
  if (loading) {
    return (
      <div>
        <Loader style={style.loader} />
        Loading Claim Board...
      </div>
    );
  }
  return (
    <div className="panel is-info" style={style.panel}>
      <p className="panel-heading">
        Records of Claim
        <i
          class="fas fa-sync"
          aria-label="refresh"
          style={style.clickable}
          onClick={() => run()}
        ></i>
        <br />
        <span style={{ fontSize: "12px" }}>
          Update every minutes, last updated: {lastUpdate}
        </span>
      </p>
      <p className="panel-block">
        Claimed:{" "}
        <code>
          {" "}
          {data.claimLogs.length}/{detail.quantity}{" "}
        </code>
      </p>
      <div className="claim-logs">
        {data.claimLogs.map((claimLog) => (
          <ClaimLog key={claimLog.id} claimLog={claimLog} token={token} />
        ))}
      </div>
    </div>
  );
}
