import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";

export default function Signout() {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  useEffect(() => {
    logout();
  });

  return <p>Logging out...</p>;
}
