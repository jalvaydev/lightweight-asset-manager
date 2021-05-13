import { useOktaAuth } from "@okta/okta-react";

export default function User() {
  const { authState, oktaAuth } = useOktaAuth();

  const profile = async () => await oktaAuth.getUser();

  console.log(profile());

  return <p>User page</p>;
}
