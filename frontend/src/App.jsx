import { Route, Switch, useHistory } from "react-router-dom";
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
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(config);

function App() {
  const history = useHistory();
  const sendToHome = async () => {
    history.push("/dashboard");
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={sendToHome}>
      <Route path="/login" exact component={Login} />
      <Switch>
        <Route path="/" exact component={Home} />
        <SecureRoute path="/dashboard" exact>
          <Container>
            <Dashboard />
          </Container>
        </SecureRoute>
        <SecureRoute path="/assets" exact>
          <Container>
            <Assets />
          </Container>
        </SecureRoute>
        <SecureRoute path="/edit/:id">
          <Container>
            <Asset />
          </Container>
        </SecureRoute>
        <SecureRoute path="/signout" exact component={Signout} />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
      </Switch>
    </Security>
  );
}

export default App;
