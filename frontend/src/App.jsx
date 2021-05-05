import { Route, Switch, useHistory } from "react-router-dom";
import { LoginCallback, Security, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { config } from "./config";
import Signout from "./Signout";
import Assets from "./Assets";
import Home from "./Home";
const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(config);

function App() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Switch>
        <Route path="/" exact component={Home} />
        <SecureRoute path="/assets" exact component={Assets} />
        <SecureRoute path="/signout" exact component={Signout} />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
      </Switch>
    </Security>
  );
}

export default App;
