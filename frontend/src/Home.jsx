import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import Container from "./Container";
import Login from "./Login";
import Dashboard from "./Dashboard";

function Home() {
  const { authState } = useOktaAuth();

  const userText = authState.isAuthenticated ? (
    <Container title="Dashboard">
      <Dashboard />
    </Container>
  ) : (
    <Login />
  );

  return <div>{userText}</div>;
}

export default Home;
