import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Button, Footer, Content, Navbar } from 'react-bulma-components';

import Claim from "./pages/Claim";

export default function App() {
  return (
    <Router>
      <div id="wrapper">
      <Navbar
        fixed="top"
        active={false}
        transparent={false}
      >
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/">
            {/* <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" /> */}
            Matataki AirDropper
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container>
            <Navbar.Item href="/send">
              Send
            </Navbar.Item>
            <Navbar.Item href="/claim">
              Redeem
            </Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="#">
                  Sign In
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
      
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/claim/:symbol-:hash" children={<Claim />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer style={{padding: "1.5rem"}}>
        <Content className="has-text-centered">
          <p>
            Matataki Token AirDropper ©️ Nao KM All Right Reserved.
            <br/>
            This is a 3rd party apps develop for Matataki.
            <br/>
            I have open sourced the code right here: <a href={process.env.REACT_APP_FE_REPO} target="_blank" rel="noopener">GitHub</a>
          </p>
        </Content>
      </Footer>
    </Router>
  );
}

function Home() {
  return <h2>Home<Button color="primary">My Bulma button</Button></h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}