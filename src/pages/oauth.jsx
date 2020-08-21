import React from "react";
import { useMount } from "ahooks";
import { useHistory } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useStore } from "../store";

function HandleLoginOAuthCallback() {
  const query = useQuery();
  const store = useStore();
  const router = useHistory();

  const accessToken = query.get("token");

  useMount(() => {
    console.log("mounted", accessToken);
    if (!accessToken) return;
    store.set("accessToken")(accessToken);
    router.replace("/");
  });
  if (!accessToken) {
    return (
      <div className="msg">
        <p>Sorry. But Matataki OAuth login did not seems working.</p>
        <p>Please contract the matataki team for help</p>
        <p>or use traditional way to login.</p>
      </div>
    );
  }
  return (
    <div className="msg">
      <p>Handling callback now, please wait.</p>
    </div>
  );
}

export default HandleLoginOAuthCallback;
