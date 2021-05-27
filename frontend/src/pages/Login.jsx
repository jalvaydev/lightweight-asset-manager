import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import OktaSignInWidget from "../components/OktaSignInWidget";

export default function Login() {
  const { oktaAuth, authState } = useOktaAuth();
  let history = useHistory();

  if (authState.isAuthenticated) {
    history.push("/dashboard");
  }

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("error logging in", err);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <OktaSignInWidget
            config={{
              logo: `${process.env.PUBLIC_URL}/mylogo.png`,
              baseUrl: "https://dev-41703573.okta.com",
              clientId: "0oaopy53oHbY480ks5d6",
              redirectUri: window.location.origin + "/login/callback",
              idpDisplay: "PRIMARY",
              idps: [{ type: "google", id: "0oasykoqcacZ9cEoB5d6" }],
            }}
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
