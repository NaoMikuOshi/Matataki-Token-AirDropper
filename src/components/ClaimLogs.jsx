import React from "react";
import { useRequest } from "ahooks";
import { getUserProfile } from "../api/user";
import Avatar from "./Avatar";
import { getClaimLogs } from "../api/backend";

export function ClaimLogs({ cashtag, ...props }) {
  const { data, error, loading } = useRequest(() => getClaimLogs(cashtag));
  if (error) {
    return <div className="claim-logs">Failed to History of Claimed</div>;
  }
  if (loading) {
    return <div className="claim-logs">Loading Claimed History...</div>;
  }
  return (
    <div className="claim-logs">
      {data.claimLogs.map((claimLog) => (
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
    return <div className="panel-block is-active">failed to load</div>;
  }
  if (loading) {
    return <div className="panel-block is-active">loading...</div>;
  }

  return (
    <div className="panel-block is-active">
      <Avatar location={data.data.avatar} />
      <div class="logs">
        <span>
          {data.data.nickname} Got {claimLog.amount / 10000}
        </span>
        <span>{token.symbol}</span>
      </div>
    </div>
  );
}
