import { useQuery } from "@apollo/client";
import React from "react";
import { COUNT_ASSETS } from "../graphql/queries/countAssets";
import Alert from "../components/Alert";

export default function Dashboard() {
  const { error, data } = useQuery(COUNT_ASSETS);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {error && <Alert title="Server error" text={error.message} />}
      </div>
      <div className="py-4">
        <div>{data && <Stats count={data.countAssets} />}</div>
      </div>
    </div>
  );
}

function Stats({ count }) {
  return (
    <div>
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
              {count ? count : "0"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
