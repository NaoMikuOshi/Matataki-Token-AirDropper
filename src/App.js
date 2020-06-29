import React, { useEffect } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  Footer,
  Content,
  Hero,
  Container,
  Heading,
} from "react-bulma-components";
import { useStore } from "./store";
import Claim from "./pages/Claim";
import Send from "./pages/Send";
import Login from "./pages/Login";
import ClaimWithCashtag from "./pages/ClaimWithCashtag";
import { getCookie } from "./utils/cookie";
import Navigation from "./components/Navigation";
import FooterEffect from "./components/FooterEffect";
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
          <Route path="/send" children={<Send />} />
          <Route path="/login" children={<Login />} />
          <Route path="/claim/$:cashtag" children={<Claim />} />
          <Route path="/claim/" children={<ClaimWithCashtag />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <div class="footer">
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
              This is a 3rd party apps develop for Matataki.
              <br />I have open sourced the code right here:
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

function Home() {
  const store = useStore();
  const userInfo = store.get("userInfo");
  return (
    <div>
      <div class="top">
        <Hero color="primary" gradient>
          <Hero.Body>
            <Container>
              <Heading>Matataki Token AirDropper</Heading>
              <Heading subtitle size={3}>
                A simple app to airdrop your <strong>Matataki Token</strong>
              </Heading>
              <Heading subtitle size={4}>
                Share to anywhere with the magical link.
              </Heading>

              {userInfo.username ? (
                <div className="action-buttons">
                  <Link to="/send">
                    <Button
                      color="primary"
                      rounded={true}
                      style={{ margin: "5px" }}
                    >
                      Send
                    </Button>
                  </Link>
                  <Link to="/claim">
                    <Button
                      color="light"
                      rounded={true}
                      style={{ margin: "5px" }}
                    >
                      Redeem
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    color="light"
                    rounded={true}
                    style={{ margin: "5px" }}
                  >
                    Login to continue
                  </Button>
                </Link>
              )}
            </Container>
          </Hero.Body>
        </Hero>
      </div>
      <section class="section">
        <Container></Container>
      </section>
    </div>
  );
}
