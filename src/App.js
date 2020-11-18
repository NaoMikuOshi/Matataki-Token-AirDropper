import React, { useEffect } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Content } from "react-bulma-components";
import { useStore } from "./store";
import Claim from "./pages/Claim";
import Send from "./pages/Send";
import Login from "./pages/Login";
import OAuth from "./pages/oauth";
import ClaimStop from "./pages/StopAirdrop";
import ClaimWithCashtag from "./pages/ClaimWithCashtag";
import { getCookie } from "./utils/cookie";
import Navigation from "./components/Navigation";
import FooterEffect from "./components/FooterEffect";
import PrivateRoute from "./components/PrivateRoute";
import { MyPage } from "./pages/MyPage";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  const store = useStore();
  // Init app, try to get access token
  useEffect(() => {
    const accessToken = getCookie("ACCESS_TOKEN");
    if (!accessToken) {
      return;
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    store.set("accessToken")(accessToken);
    // effect of no dependencies, so this only run this function at the component mounted
  }, []);
  return (
    <Router>
      <div id="wrapper">
        <Navigation />
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <PrivateRoute path="/send">
            <Send />
          </PrivateRoute>
          <Route path="/login" children={<Login />} />
          <Route path="/oauth" children={<OAuth />} />
          <Route path="/claim/$:cashtag" children={<Claim />} />
          <Route path="/claim/:cashtag" children={<Claim />} />
          <Route path="/stop/:cashtag" children={<ClaimStop />} />
          <PrivateRoute path="/claim" children={<ClaimWithCashtag />} />
          <PrivateRoute path="/my" children={<MyPage />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <div className="footer">
        <Footer>
          <FooterEffect />
          <Content className="has-text-centered">
            <p>
              Matataki Token AirDropper{" "}
              <span role="img" aria-label="copyright">
                ©️
              </span>{" "}
              Nao KM All Right Reserved.
              <br />
              This is a 3rd party apps for Matataki, and project was open
              sourced the at{" "}
              <a
                href={process.env.REACT_APP_FE_REPO}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </Content>
        </Footer>
      </div>
    </Router>
  );
}
