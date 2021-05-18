import { useQuery } from "@apollo/client";
import React from "react";
import { COUNT_ASSETS } from "../graphql/queries/countAssets";
import Alert from "../components/Alert";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  const { error, data } = useQuery(COUNT_ASSETS, {
    variables: { input: "test" },
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {error && <Alert title="Server error" text={error.message} />}
      </div>
      <div className="py-4">
        <div>{data && <Stats countAssets={data.countAssets} />}</div>
      </div>
    </div>
  );
}

function Stats({ countAssets }) {
  const data = {
    labels: ["In Use", "In Store", "Service", "Broken"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          countAssets.inUse,
          countAssets.inStore,
          countAssets.service,
          countAssets.broken,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
              {countAssets.totalAssets ? countAssets.totalAssets : "0"}
            </dd>
          </div>

          <div
            key="status"
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              Status
            </dt>
            <dd className="mt-1">
              <Pie data={data} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
