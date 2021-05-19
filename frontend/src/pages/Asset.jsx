import { useLazyQuery, useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import { useState } from "react";
import Alert from "../components/Alert";
import { ASSET } from "../graphql/queries/asset";
import { MODEL_BY_NAME } from "../graphql/queries/modelByName";
import EditField from "../components/EditField";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";

export default function Asset() {
  const { error, data } = useQuery(ASSET, {
    variables: { input: window.location.pathname.split("/")[2] },
  });
  const [loadModel, { data: model }] = useLazyQuery(MODEL_BY_NAME, {
    variables: { name: data ? data.asset.model : "" },
  });

  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showModel, setShowModel] = useState(false);

  console.log(model);
  return (
    <>
      {open && (
        <Modal open={open} setOpen={setOpen}>
          <EditField
            open={open}
            setOpen={setOpen}
            field={field}
            fieldLabel={fieldLabel}
            placeholder={placeholder}
            assetId={data.asset.id}
          />
        </Modal>
      )}
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Asset Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and edit the asset information
        </p>
      </div>
      {error && (
        <Alert
          title="Error"
          text="Error retrieving your profile, try again later..."
        />
      )}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Asset name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.asset.name}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("name");
                    setFieldLabel("Asset Name");
                    setPlaceholder("Enter the asset name...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Date of Purchase
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {data && new Date(data.asset.dateOfPurchase).toString()}
              </span>
            </dd>
          </div>

          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Purchase Cost</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {" "}
                {data && "$" + data.asset.cost / 100}
              </span>
            </dd>
          </div>
          <div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4 cursor-pointer">
              <dt
                className="text-sm font-medium text-gray-500"
                onClick={() => {
                  if (showModel === false) loadModel();
                  setShowModel(!showModel);
                }}
              >
                <div className="flex">
                  <p>Model</p>
                  <InformationCircleIcon className="h-4 mt-0.5" />
                </div>
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {(!showModel && data) ||
                  (model && model.modelByName === null && data)
                    ? data.asset.model
                    : ""}
                </span>
              </dd>
            </div>
            <Transition
              show={
                showModel && model
                  ? true
                  : false && model.modelByName !== undefined
              }
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="ml-5">
                <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      {model && model.modelByName.name}
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Manufacturer
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      {model && model.modelByName.manufacturer}
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Model No.
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">
                      {model && model.modelByName.modelno}
                    </span>
                  </dd>
                </div>
              </div>
            </Transition>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Serial</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.asset.serial}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("serial");
                    setFieldLabel("Serial");
                    setPlaceholder("Enter the serial of the asset...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Note</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.asset.note}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("note");
                    setFieldLabel("Note");
                    setPlaceholder("Enter a new note here...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.asset.status}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("status");
                    setFieldLabel("Status");
                    setPlaceholder("Enter a new status here...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
