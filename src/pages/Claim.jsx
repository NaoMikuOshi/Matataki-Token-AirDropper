import React, { useState, useEffect } from "react";
import "./claim.scss";
import { useParams } from "react-router-dom";
import { Container, Heading, Button } from "react-bulma-components";
import { getDetailOfAirdrop } from "../api/backend";
import { getUserProfile } from "../api/user";
import { getAvatarUrl } from "../utils";
import { getTokenProfile } from "../api/token";

const AIRDROP_TYPE = {
  WAIT_FOR_QUERY: "wait",
  EQUAL: "equal",
  RANDOM: "random",
};

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
  const [airdropDetail, updateDetail] = useState(null);
  const [owner, updateOwner] = useState(null);
  const [token, updateToken] = useState(null);

  // @todo: get token data
  useEffect(() => {
    async function fetchData() {
      const detail = await getDetailOfAirdrop(cashtag);
      updateDetail(detail);
      const [ownerProfile, tokenProfile] = await Promise.all([
        getUserProfile(detail.owner),
        getTokenProfile(detail.token_id),
      ]);
      // const ownerProfile = await
      updateOwner(ownerProfile.data);
      // const tokenProfile = await
      updateToken(tokenProfile.data.token);
    }
    fetchData();
  }, [cashtag]);
  /* eslint-disable */
  const claimButtonText = "Claim with luck";

  if (!airdropDetail || !owner || !token) {
    return <Loading />;
  }
  return (
    <Container
      className="has-text-centered panel is-primary"
      style={{ maxWidth: "650px", margin: "10px auto" }}
    >
      <p className="panel-heading">
        Air Drop of Total {airdropDetail.amount / 10000} {token.symbol}
      </p>
      <Heading subtitle renderAs="p">
        Sent to you by
      </Heading>
      <div className="user-card">
        <div className="avatar is-flex is-horizontal-center">
          <figure className="image is-128x128 is-flex is-horizontal-center">
            <img
              className="is-rounded"
              alt="User avatar"
              src={getAvatarUrl(owner.avatar)}
            />
          </figure>
        </div>
        <Heading size={5}>{owner.nickname || owner.username}</Heading>
      </div>
      <Button className="is-rounded is-primary">{claimButtonText}</Button>
      <div
        className="panel is-info"
        style={{ maxWidth: "600px", margin: "10px auto" }}
      >
        <p className="panel-heading">Records of Claim</p>
        {/* <p className="panel-block">
          Remain:{" "}
          <code>
            {airdropDetail.quantity.remain} / {airdropDetail.quantity.total}
          </code>
        </p>
        {airdropDetail.history.map((record) => {
          return (
            <div className="panel-block is-active">
              <figure className="image is-32x32">
                <img
                  className="is-rounded"
                  alt="User avatar"
                  src={record.avatar}
                />
              </figure>
              {record.nickname} Got {record.amount / 10000}{" "}
              {airdropDetail.symbol}
            </div>
          );
        })} */}
      </div>
    </Container>
  );
}
