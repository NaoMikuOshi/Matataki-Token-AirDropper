import React from "react";
import { getUrlOfMatatakiCdn } from "../utils";

export default function Avatar({ size = 32, location }) {
  const DEFAULT_AVATAR_IF_NOT_PROVIDED =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";
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
