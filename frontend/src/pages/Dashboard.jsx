import { useQuery, gql } from "@apollo/client";
import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

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

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="py-4">
        {!userInfo && <p></p>}
        {userInfo && (
          <div>
            <Stats />
          </div>
        )}
      </div>
    </div>
  );
}

export const COUNT_ASSETS = gql`
  query CountAssets {
    countAssets
  }
`;

function Stats() {
  const { loading, error, data } = useQuery(COUNT_ASSETS);
  return (
    <div>
      {data && (
        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div
              key="assets"
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                Assets
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {data.countAssets}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
