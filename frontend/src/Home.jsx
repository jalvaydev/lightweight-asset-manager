import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router";

export default function Home() {
  const { authState } = useOktaAuth();

  return (
    <div>
      {authState.isAuthenticated && <Redirect to="/dashboard" />}
      {!authState.isAuthenticated && <Redirect to="/login" />}
    </div>
  );
}
