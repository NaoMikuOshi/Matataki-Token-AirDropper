import React, { useState } from 'react';
import "./claim.scss";
import { useParams } from "react-router-dom";
import { Container, Heading, Button } from "react-bulma-components";

const AIRDROP_TYPE = {
    WAIT_FOR_QUERY: 'wait',
    EQUAL: 'equal',
    RANDOM: 'random'
}

function Loading() {
    return <div className="is-loading has-text-centered">
        <span role="img" aria-label="airdrop" style={{fontSize: "64px"}}>🪂</span>
        <Heading renderAs="p">Loading Infomation about this airdrop</Heading>
        <Heading subtitle renderAs="p">please wait for the server response...</Heading>
    </div>
}

export default function Claim() {
    const { symbol, hash } = useParams();
    const [ airdropDetail, updateDetail ] = useState({
        type: AIRDROP_TYPE.RANDOM,
        total: 10000 * 20,
        quantity: {
            total: 20,
            remain: 19
        },
        history: [{
            nickname: 'Anonymous',
            amount: '10000',
            avatar: "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg"
        }],
        sender: {
            uid: 9527,
            nickname: 'Frank',
            avatar: "https://ssimg.frontenduse.top/avatar/2019/12/27/1a128129ee9c72b855ecc956da588d45.jpg"
        }
    })
    const claimButtonText = (() => {
        switch(airdropDetail.type) {
            case AIRDROP_TYPE.EQUAL: return 'Claim';
            case AIRDROP_TYPE.RANDOM: return 'Claim with luck';
            default: return 'Fetching Infomation...' 
        }
    })();

    if (airdropDetail.type === AIRDROP_TYPE.WAIT_FOR_QUERY) {
        return <Loading />;
    }
    return <Container className="has-text-centered">
      <Heading size={5} renderAs="p">Air Drop of {symbol}</Heading>
      <Heading subtitle renderAs="p">Sent to you by</Heading>
      <div className="user-card">
          <div className="avatar is-flex is-horizontal-center">
            <figure class="image is-128x128 is-flex is-horizontal-center">
                <img class="is-rounded" alt="User avatar" src={airdropDetail.sender.avatar} />
            </figure>
          </div>
        <Heading size={5}>{airdropDetail.sender.nickname}</Heading>
      </div>
      <Button className="is-rounded is-primary">{claimButtonText}</Button>
  </Container>
}

