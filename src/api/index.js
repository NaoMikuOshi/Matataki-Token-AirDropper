import axios from "axios";
import { getCookie } from "../utils/cookie";

const client = axios.create({
  baseURL: process.env.REACT_APP_MATATAKI_API,
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

export default client;
