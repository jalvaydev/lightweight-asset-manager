import { useQuery } from "@apollo/client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { COUNT_ASSETS } from "../graphql/queries/countAssets";

export default function PaginationNav({ page, count, limit, skip }) {
  const { data } = useQuery(COUNT_ASSETS, { variables: { input: "" } });

  if (count === 0) {
    count = 1;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {page > 1 && (
          <a
            href={`/assets/page/${parseInt(page) - 1}`}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Previous
          </a>
        )}
        <a
          href={`/assets/page/${parseInt(page) + 1}`}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Next
        </a>
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
              <a
                href={`/assets/page/1`}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {data && skip - count * 4 >= 0 && (
              <a
                href={`/assets/page/${parseInt(page) - 4}`}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {data && skip - count * 3 >= 0 && (
              <div>
                <a
                  href={`/assets/page/${parseInt(page) - 3}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {page - 3}
                </a>
              </div>
            )}
            {data && skip - count * 2 >= 0 && (
              <div>
                <a
                  href={`/assets/page/${parseInt(page) - 1}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {page - 2}
                </a>
              </div>
            )}
            {data && skip - count >= 0 && (
              <a
                href={`/assets/page/${parseInt(page) - 1}`}
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page - 1}
              </a>
            )}
            <p className="hidden md:inline-flex relative items-center px-4 py-2 border font-extrabold border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50">
              {page}
            </p>
            {data && skip + count < data.countAssets.totalAssets && (
              <a
                href={`/assets/page/${parseInt(page) + 1}`}
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 1}
              </a>
            )}
            {data && skip + count * 2 < data.countAssets.totalAssets && (
              <a
                href={`/assets/page/${parseInt(page) + 2}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 2}
              </a>
            )}
            {data && skip + count * 3 < data.countAssets.totalAssets && (
              <a
                href={`/assets/page/${parseInt(page) + 3}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {page + 3}
              </a>
            )}
            {data && skip + count * 4 < data.countAssets.totalAssets && (
              <a
                href={`/assets/page/${parseInt(page) + 4}`}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {data && skip + count * 5 < data.countAssets.totalAssets && (
              <a
                href={`/assets/page/${Math.ceil(
                  data.countAssets.totalAssets / count
                )}`}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
