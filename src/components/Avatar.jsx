import React from "react";
import { getAvatarUrl } from "../utils";

export default function Avatar({ size = 32, location }) {
  const DEFAULT_AVATAR_IF_NOT_PROVIDED =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";
  const avatarUrl = location
    ? getAvatarUrl(location)
    : DEFAULT_AVATAR_IF_NOT_PROVIDED;
  return (
    <figure className={`image is-${size}x${size}`}>
      <img
        className="is-rounded"
        alt="User avatar"
        src={avatarUrl}
        style={{ width: size, height: size }}
      />
    </figure>
  );
}
