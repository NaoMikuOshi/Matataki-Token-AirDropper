import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Navbar } from "react-bulma-components";
import { getAvatarUrl } from "../utils";

import { useStore } from "../store";
import { removeCookie } from "../utils/cookie";

function UserStatusNavItems() {
  const store = useStore();
  const userInfo = store.get("userInfo");
  function logout() {
    removeCookie("ACCESS_TOKEN");
    store.set("userInfo")({});
  }
  if (userInfo.username) {
    return [
      <Navbar.Item>
        {userInfo.avatar && (
          <figure class="image is-32x32">
            <img
              class="is-rounded"
              alt="User avatar"
              src={getAvatarUrl(userInfo.avatar)}
            />
          </figure>
        )}
        {userInfo.nickname || userInfo.username}
      </Navbar.Item>,
      <Navbar.Item onClick={() => logout()}>Logout</Navbar.Item>,
    ];
  } else {
    return [<Navbar.Item href="/login">Sign In</Navbar.Item>];
  }
}

export default function Navigation() {
  return (
    <Navbar fixed="top" active={false} transparent={false}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          Matataki AirDropper
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="/send">Send</Navbar.Item>
          <Navbar.Item href="/claim">Redeem</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          {UserStatusNavItems()}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}
