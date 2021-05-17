import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { LoginCallback, Security, SecureRoute } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import { config } from "./config";
import Signout from "./pages/Signout";
import Assets from "./pages/Assets";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Container from "./Container";
import Home from "./Home";
import Asset from "./pages/Asset";
import Users from "./pages/Users";
import User from "./pages/User";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(config);

function App() {
  const history = useHistory();
  const sendToHome = async () => {
    history.push("/dashboard");
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={sendToHome}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <SecureRoute path="/dashboard" exact>
          <Container>
            <Dashboard />
          </Container>
        </SecureRoute>
        <SecureRoute exact path="/users/">
          <Redirect to="/users/page/1" />
        </SecureRoute>
        <SecureRoute exact path="/profile">
          <Container>
            <User />
          </Container>
        </SecureRoute>
        <SecureRoute exact path="/users/page/:num">
          <Container>
            <Users />
          </Container>
        </SecureRoute>
        <SecureRoute exact path="/assets/">
          <Redirect to="/assets/page/1" />
        </SecureRoute>
        <SecureRoute path="/assets/page/:num" exact>
          <Container>
            <Assets />
          </Container>
        </SecureRoute>
        <SecureRoute path="/asset/:id">
          <Container>
            <Asset />
          </Container>
        </SecureRoute>
        <SecureRoute path="/signout" exact component={Signout} />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
        <Route>
          <p>404: Page not found</p>
        </Route>
      </Switch>
    </Security>
  );
}

export default App;
