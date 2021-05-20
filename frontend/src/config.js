export const config = {
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `${
    process.env.NODE_ENV === "production"
      ? "https://lightasset.herokuapp.com/login/callback"
      : `http://localhost:3000/login/callback`
  }`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
};
