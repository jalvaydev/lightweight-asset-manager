// import { useState, useEffect } from "react";
// import { useOktaAuth } from "@okta/okta-react";
// const { authState, oktaAuth } = useOktaAuth();
// const [userInfo, setUserInfo] = useState(null);
// useEffect(() => {
//   if (!authState.isAuthenticated) {
//     // When user isn't authenticated, forget any user info
//     setUserInfo(null);
//   } else {
//     oktaAuth.getUser().then((info) => {
//       setUserInfo(info);
//     });
//   }
// }, [authState, oktaAuth]); // Update if authState changes
