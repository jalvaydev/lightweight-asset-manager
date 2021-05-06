import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  console.log(authState);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return <p>Fetching dashboard...</p>;
  }

  return (
    <div>
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          {userInfo && <p>Welcome! {userInfo.name}</p>}
        </div>
      </div>
    </div>
  );
}
