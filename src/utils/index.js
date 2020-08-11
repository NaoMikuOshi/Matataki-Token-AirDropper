export function getUrlOfMatatakiCdn(location) {
  const imageCDNServer = process.env.REACT_APP_MTTK_IMG_CDN;
  return `${imageCDNServer}${location}`;
}

export function disassemble(token) {
  if (!token) return { iss: null, exp: 0, platform: null, id: null };
  let tokenPayload = token.substring(token.indexOf(".") + 1);
  tokenPayload = tokenPayload.substring(0, tokenPayload.indexOf("."));
  return JSON.parse(atob(tokenPayload));
}

export function getAirdropUrl(cashtag) {
  return `${window.location.origin}/claim/${cashtag}`;
}
