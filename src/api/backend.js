import axios from "axios";
import { getCookie } from "../utils/cookie";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  timeout: 1000 * 30,
  headers: {},
});

// Just copy from matataki-fe
client.interceptors.request.use(
  (config) => {
    if (getCookie("ACCESS_TOKEN"))
      config.headers["x-access-token"] = getCookie("ACCESS_TOKEN");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // if(loadingInstance) loadingInstance.close();
    return response.data;
  },
  (error) => {
    // loadingInstance.close()
    console.log(error.message);

    if (error.message.includes("status code 401")) {
      alert("登录状态异常,请重新登录");
    }
    //     if (process.browser && window && window.$nuxt) {

    //       // window.$nuxt.$store.commit('setLoginModal', true)

    //       try {
    //         // 重置all store
    //         window.$nuxt.$store.dispatch('resetAllStore')
    //         .then(() => {
    //           clearAllCookie()
    //           // 防止没有清除干净
    //           removeCookie('ACCESS_TOKEN')
    //           removeCookie('idProvider')
    //           store.clearAll()
    //           sessionStorage.clear()
    //         }).catch(err => {
    //           console.log(err)
    //           removeCookie('ACCESS_TOKEN')
    //         })
    //       } catch(e) {
    //         console.log(e)
    //         removeCookie('ACCESS_TOKEN')
    //       }
    //     }
    //   }

    // 超时处理
    if (error.message.includes("timeout")) {
      // Message.closeAll()
      alert("请求超时");
    }
    if (error.message.includes("Network Error")) {
      alert("Network Error");
    }
    // loadingInstance.close()
    return Promise.reject(error);
  }
);

/**
 * Api Docs in over here: https://docs.matataki.io/airdrop.html
 */

/**
 *
 * @param {string} title 标题
 * @param {number} tokenId fan票id
 * @param {number} amount 空投总量
 * @param {number} quantity 空投份额
 * @param {string} type 空投类型，只能是 'random' 或 'equal'
 * @param {string} cashtag cashtag
 */
export function createAirdrop(title, tokenId, amount, quantity, type, cashtag) {
  return client.post("/airdrop", {
    title,
    tokenId,
    amount,
    quantity,
    type,
    cashtag,
  });
}

export function getAirdropList(page = 1, limit = 10, sort = "created_at,DESC") {
  return client.get("/airdrop", {
    params: {
      sort,
      limit,
      page,
    },
  });
}

export function getDetailOfAirdrop(cashtag) {
  return client.get(`/airdrop/${cashtag}`);
}

/**
 * Claim Airdrop
 * @param {string} cashtag The $Cashtag of the airdrop
 */
export function claimAirdrop(cashtag, memo = "") {
  return client.post(`/airdrop/${cashtag}`, { memo });
}

export function getClaimLogs(cashtag) {
  return client.get(`/claim/${cashtag}`);
}

export function checkIsClaimed(cashtag) {
  return client.get(`/airdrop/${cashtag}/isClaimed`);
}

export function getUserData(uid) {
  return client.get(`/user/${uid}`);
}
