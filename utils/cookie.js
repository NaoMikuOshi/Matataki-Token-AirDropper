import Cookies from "js-cookie";

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, val, options) {
  return Cookies.set(key, val, options);
}

export function removeCookie(key) {
  return Cookies.remove(key);
}

export function clearAllCookie() {
  // eslint-disable-next-line no-useless-escape
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
}
