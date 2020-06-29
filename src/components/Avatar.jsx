import React from "react";
import { getAvatarUrl } from "../utils";

export default function Avatar({ size = 32, location }) {
  const avatarUrl = location
    ? getAvatarUrl(location)
    : "https://www.gravatar.com/avatar/00000000000000000000000000000000";
  return (
    <figure className={`image is-${size}x${size}`}>
      <img className="is-rounded" alt="User avatar" src={avatarUrl} />
    </figure>
  );
}
