import React from "react";
import { getUrlOfMatatakiCdn } from "../utils";

export default function Avatar({ size = 32, location }) {
  const DEFAULT_AVATAR_IF_NOT_PROVIDED =
    "https://img.zcool.cn/community/015a465698b54432f87574be965625.png@1280w_1l_2o_100sh.png";
  const avatarUrl = location
    ? getUrlOfMatatakiCdn(location)
    : DEFAULT_AVATAR_IF_NOT_PROVIDED;
  return (
    <figure className={`image is-${size}x${size}`}>
      <img
        className="log-avatar"
        alt="User avatar"
        src={avatarUrl}
        style={{ width: size, height: size }}
      />
    </figure>
  );
}
