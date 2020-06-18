import React, { useState, useEffect } from "react";
import "./claim.scss";
import { useParams } from "react-router-dom";
import { Container, Heading, Button } from "react-bulma-components";

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
  // @todo: implement with backend
  useEffect(() => {
    console.log(cashtag);
  }, [cashtag]);
  /* eslint-disable */
  const [airdropDetail, updateDetail] = useState({
    type: AIRDROP_TYPE.RANDOM,
    symbol: "FWC",
    sum: 10000 * 20,
    quantity: {
      total: 20,
      remain: 19,
    },
    history: [
      {
        nickname: "Anonymous",
        amount: "10000",
        avatar:
          "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg",
      },
      {
        nickname: "Link",
        amount: "20000",
        avatar:
          "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg",
      },
      {
        nickname: "Xiaodao",
        amount: "80000",
        avatar:
          "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg",
      },
    ],
    sender: {
      uid: 9527,
      nickname: "Frank",
      avatar:
        "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg",
    },
  });
  const claimButtonText = (() => {
    switch (airdropDetail.type) {
      case AIRDROP_TYPE.EQUAL: {
        const amount = airdropDetail.sum / airdropDetail.quantity.total / 10000; // 4 demcial means 10000 is 1 Token
        return `Claim ${amount} ${airdropDetail.symbol}`;
      }
      case AIRDROP_TYPE.RANDOM:
        return "Claim with luck";
      default:
        return "Fetching Infomation...";
    }
  })();

  if (airdropDetail.type === AIRDROP_TYPE.WAIT_FOR_QUERY) {
    return <Loading />;
  }
  return (
    <Container
      className="has-text-centered panel is-primary"
      style={{ maxWidth: "650px", margin: "10px auto" }}
    >
      <p className="panel-heading">
        Air Drop of Total {airdropDetail.sum} {airdropDetail.symbol}
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
              src={airdropDetail.sender.avatar}
            />
          </figure>
        </div>
        <Heading size={5}>{airdropDetail.sender.nickname}</Heading>
      </div>
      <Button className="is-rounded is-primary">{claimButtonText}</Button>
      <div
        className="panel is-info"
        style={{ maxWidth: "600px", margin: "10px auto" }}
      >
        <p className="panel-heading">Records of Claim</p>
        <p className="panel-block">
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
        })}
      </div>
    </Container>
  );
}
