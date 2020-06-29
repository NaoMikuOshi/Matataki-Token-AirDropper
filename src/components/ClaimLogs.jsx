import React from "react";
import { useRequest } from "ahooks";
import { getUserProfile } from "../api/user";
import Avatar from "./Avatar";

export function ClaimLogs({ claimLogs, ...props }) {
  return (
    <div className="claim-logs">
      {claimLogs.map((claimLog) => (
        <ClaimLog key={claimLog.id} claimLog={claimLog} {...props} />
      ))}
    </div>
  );
}

function ClaimLog({ claimLog, token }) {
  const { data, error, loading } = useRequest(() =>
    getUserProfile(claimLog.uid)
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="panel-block is-active">
      <Avatar location={data.data.avatar} />
      {data.data.nickname} Got {claimLog.amount / 10000}
      {token.symbol}
    </div>
  );
}
