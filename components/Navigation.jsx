import React from "react";
import { useBoolean } from "ahooks";
import { Navbar } from "react-bulma-components";
import { Link } from "next/link"//"react-router-dom";
// import { useStore } from "../store";
import { removeCookie } from "../utils/cookie";
import Avatar from "./Avatar";

function UserStatusNavItems() {
  // const store = useStore();
  const userInfo = {};//store.get("userInfo");
  function logout() {
    removeCookie("ACCESS_TOKEN");
    // store.set("userInfo")({});
    // store.set("accessToken")("");
  }
  if (userInfo.username) {
    return [
      <Navbar.Item key="user" renderAs={Link} to="/my">
        <Avatar location={userInfo.avatar} size={28} />
        <span className="username">
          {userInfo.nickname || userInfo.username}
        </span>
      </Navbar.Item>,
      <Navbar.Item key="action" onClick={() => logout()}>
        Logout
      </Navbar.Item>,
    ];
  } else {
    return [
      <Navbar.Item key="action" renderAs={Link} to="/login">
        Sign In
      </Navbar.Item>,
    ];
  }
}

export default function Navigation() {
  // const store = useStore();
  const isLogined = false;//Boolean(store.get("accessToken"));

  const [active, { toggle }] = useBoolean(false);

  return (
    <Navbar
      fixed="top"
      active={active}
      onClick={() => toggle()}
      transparent={false}
    >
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to="/">
          Matataki AirDropper <span style={{ fontSize: "12px" }}>Beta</span>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          {isLogined && (
            <Navbar.Item renderAs={Link} to="/send">
              Send
            </Navbar.Item>
          )}
          {isLogined && (
            <Navbar.Item renderAs={Link} to="/claim">
              Redeem
            </Navbar.Item>
          )}
          <Navbar.Item
            href={`${process.env.REACT_APP_FE_REPO}/issues`}
            target="_blank"
          >
            Beta Feedback
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          {UserStatusNavItems()}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}
