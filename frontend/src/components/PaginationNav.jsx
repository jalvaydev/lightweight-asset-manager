import { useQuery } from "@apollo/client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { COUNT_ASSETS } from "../graphql/queries/countAssets";
import { useHistory } from "react-router-dom";

export default function PaginationNav({
  page,
  count,
  limit,
  skip,
  refetch,
  sortBy,
  order,
}) {
  const { data } = useQuery(COUNT_ASSETS, { variables: { input: "" } });
  const history = useHistory();

  if (count === 0) {
    count = 1;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {data && skip - count >= 0 && (
          <button
            onClick={() => {
              refetch({
                limit,
                skip: skip - limit,
                sortBy,
                order: order === true ? 1 : 0,
              });
              history.push(`/assets/page/${parseInt(page) - 1}`);
            }}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Previous
          </button>
        )}
        {data && skip + count < data.countAssets.totalAssets && (
          <button
            onClick={() => {
              refetch({
                limit,
                skip: skip + limit,
                sortBy,
                order: order === true ? 1 : 0,
              });
              history.push(`/assets/page/${parseInt(page) + 1}`);
            }}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Next
          </button>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{skip + 1}</span> to{" "}
            <span className="font-medium">{skip + count}</span> of{" "}
            <span className="font-medium">
              {data && data.countAssets.totalAssets}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {data && skip - count * 5 >= 0 && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: 0,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/1`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {data && skip - count * 4 >= 0 && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip - limit * 4,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) - 4}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {data && skip - count * 3 >= 0 && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip - limit * 3,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) - 3}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page - 3}
              </button>
            )}
            {data && skip - count * 2 >= 0 && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip - limit * 2,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) - 2}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page - 2}
              </button>
            )}
            {data && skip - count >= 0 && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip - limit,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) - 1}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page - 1}
              </button>
            )}
            <p className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border font-extrabold border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50">
              {page}
            </p>
            {data && skip + count < data.countAssets.totalAssets && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip + limit,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) + 1}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 1}
              </button>
            )}
            {data && skip + count * 2 < data.countAssets.totalAssets && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip + limit * 2,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) + 2}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 2}
              </button>
            )}
            {data && skip + count * 3 < data.countAssets.totalAssets && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip + limit * 3,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) + 3}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 3}
              </button>
            )}
            {data && skip + count * 4 < data.countAssets.totalAssets && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip + limit * 4,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(`/assets/page/${parseInt(page) + 4}`);
                }}
                className="hidden focus:outline-none md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {data && skip + count * 5 < data.countAssets.totalAssets && (
              <button
                onClick={() => {
                  refetch({
                    limit,
                    skip: skip + limit,
                    sortBy,
                    order: order === true ? 1 : 0,
                  });
                  history.push(
                    `/assets/page/${Math.ceil(
                      data.countAssets.totalAssets / count
                    )}`
                  );
                }}
                className="hidden focus:outline-none md:inline-flex o relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
