import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import PaginationNav from "../components/PaginationNav";
import Modal from "../components/Modal";
import { FEED } from "../graphql/queries/feed";
import DeleteAction from "../components/DeleteAction";
import AssetCreator from "../components/AssetCreator";
import { Transition } from "@headlessui/react";
import {
  SortAscendingIcon,
  SortDescendingIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/solid";

export default function Assets() {
  const history = useHistory();
  const [openAssetCreator, setAssetCreator] = useState(false);

  const pageIndexParams = history.location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const limit = 25;
  const skip = (page - 1) * limit;

  const [sort, setSort] = useState({ order: false, sortBy: "" });
  const { error, data, refetch } = useQuery(FEED, {
    variables: {
      limit,
      skip,
      sortBy: sort.sortBy,
      order: sort.order === true ? 1 : -1,
    },
  });
  const [deleteAction, setDeleteAction] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {openAssetCreator && (
        <Modal open={openAssetCreator} setOpen={setAssetCreator}>
          <AssetCreator
            setAssetCreator={setAssetCreator}
            openAssetCreator={openAssetCreator}
          />
        </Modal>
      )}
      {deleteAction && (
        <Modal open={deleteAction} setOpen={setDeleteAction}>
          <DeleteAction
            title="Delete asset"
            text="By clicking on the button below, you will delete the asset permanently."
            buttonText="Delete forever"
            id={deleteId}
            open={deleteAction}
            setOpen={setDeleteAction}
            refetch={refetch}
          />
        </Modal>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Assets</h1>
      </div>
      <div className="relative mb-5 w-100 h-10">
        <button
          type="button"
          onClick={() => setAssetCreator(true)}
          className="absolute top-0 right-0 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create an asset
        </button>
      </div>
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        onClick={() => {
                          setSort({ sortBy: "name", order: !sort.order });
                          refetch({
                            limit,
                            skip,
                            sortBy: sort.sortBy,
                            order: sort.order === true ? 1 : -1,
                          });
                        }}
                      >
                        <div className="flex">
                          Name
                          {sort.sortBy !== "name" && (
                            <SwitchVerticalIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                          )}
                          {sort.sortBy === "name" &&
                            (!sort.order ? (
                              <SortDescendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ) : (
                              <SortAscendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date of Purchase
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Serial
                      </th>
                      <th
                        scope="col"
                        onClick={() => {
                          setSort({ sortBy: "model", order: !sort.order });
                          refetch({
                            limit,
                            skip,
                            sortBy: sort.sortBy,
                            order: sort.order === true ? 1 : -1,
                          });
                        }}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex">
                          Model
                          {sort.sortBy !== "model" && (
                            <SwitchVerticalIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                          )}
                          {sort.sortBy === "model" &&
                            (!sort.order ? (
                              <SortDescendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ) : (
                              <SortAscendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        onClick={() => {
                          setSort({ sortBy: "status", order: !sort.order });
                          refetch({
                            limit,
                            skip,
                            sortBy: sort.sortBy,
                            order: sort.order === true ? 1 : -1,
                          });
                        }}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <div className="flex">
                          <p>Status</p>
                          {sort.sortBy !== "status" && (
                            <SwitchVerticalIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                          )}
                          {sort.sortBy === "status" &&
                            (!sort.order ? (
                              <SortDescendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ) : (
                              <SortAscendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        onClick={() => {
                          setSort({ sortBy: "cost", order: !sort.order });

                          refetch({
                            limit,
                            skip,
                            sortBy: sort.sortBy,
                            order: sort.order === true ? 1 : -1,
                          });
                        }}
                      >
                        <div className="flex">
                          Purchase Cost
                          {sort.sortBy !== "cost" && (
                            <SwitchVerticalIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                          )}
                          {sort.sortBy === "cost" &&
                            (!sort.order ? (
                              <SortDescendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ) : (
                              <SortAscendingIcon className="h-4 w-4 ml-0.5 mt-0.5" />
                            ))}
                        </div>
                      </th>
                      <th key="options" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {data &&
                      data.feed.map((asset) => (
                        <tr
                          key={asset.id + "row"}
                          className="hover:bg-gray-200 cursor-pointer"
                        >
                          <td
                            key={asset.id + "name"}
                            onClick={() => history.push(`/asset/${asset.id}`)}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {asset.name.length <= 20
                              ? asset.name
                              : asset.name.substr(0, 20) + "..."}
                          </td>
                          <td
                            key={asset.id + "date"}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {new Date(asset.dateOfPurchase).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td
                            key={asset.id + "serial"}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {asset.serial}
                          </td>
                          <td
                            key={asset.id + "model"}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {asset.model}
                          </td>
                          <td
                            key={asset.id + "status"}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {asset.status}
                          </td>
                          <td
                            key={asset.id + "cost"}
                            className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                          >
                            {"$" + asset.cost / 100}
                          </td>
                          <td
                            key={asset.id + "edit"}
                            className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                          >
                            <button
                              onClick={() => history.push(`/asset/${asset.id}`)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <p
                              onClick={() => {
                                setDeleteAction(!deleteAction);
                                setDeleteId(asset.id);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Delete
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      {data && (
        <PaginationNav
          page={page}
          count={data.feed.length}
          limit={25}
          skip={skip}
          refetch={refetch}
          sortBy={sort.sortBy}
          order={sort.order}
        />
      )}
    </div>
  );
}
