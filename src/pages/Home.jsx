import React from "react";
import { Button, Hero, Container, Heading } from "react-bulma-components";
import { useStore } from "../store";
import { BrowserRouter as Link } from "react-router-dom";

export default function Home() {
  const store = useStore();
  const userInfo = store.get("userInfo");
  return (
    <div>
      <div className="top">
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
      <section className="section">
        <Container></Container>
      </section>
    </div>
  );
}
