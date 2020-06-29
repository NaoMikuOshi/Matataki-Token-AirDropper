import React from "react";
import { Navbar } from "react-bulma-components";

import { useStore } from "../store";
import { removeCookie } from "../utils/cookie";
import Avatar from "./Avatar";

function UserStatusNavItems() {
  const store = useStore();
  const userInfo = store.get("userInfo");
  function logout() {
    removeCookie("ACCESS_TOKEN");
    store.set("userInfo")({});
  }
  if (userInfo.username) {
    return [
      <Navbar.Item key="user">
        <Avatar location={userInfo.avatar} size={28} />
        {userInfo.nickname || userInfo.username}
      </Navbar.Item>,
      <Navbar.Item key="action" onClick={() => logout()}>
        Logout
      </Navbar.Item>,
    ];
  } else {
    return [
      <Navbar.Item key="action" href="/login">
        Sign In
      </Navbar.Item>,
    ];
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
