import axios from "axios";

const client = axios.create({
  baseURL: "https://developer.matataki.io/api",
  timeout: 1000 * 30,
  headers: {},
});

export function setOAuthRedirectUri(fromPath = "/") {
  return client.post("/app/oauth", {
    clientId: process.env.REACT_APP_OAuthClientId,
    clientSecret: process.env.REACT_APP_OAuthClientSecret,
    redirect_uri: `${window.location.origin}/oauth?path=${encodeURIComponent(
      fromPath
    )}`,
  });
}
