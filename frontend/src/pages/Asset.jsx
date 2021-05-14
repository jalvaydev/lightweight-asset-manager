import { useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import { useState } from "react";
import Alert from "../components/Alert";
import { ASSET } from "../graphql/queries/asset";
import EditField from "../components/EditField";

export default function Asset() {
  const { error, data } = useQuery(ASSET, {
    variables: { input: window.location.pathname.split("/")[2] },
  });

  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");

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
              {/* <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("lastName");
                    setFieldLabel("Last Name");
                    setPlaceholder("Enter your last name...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span> */}
            </dd>
          </div>

          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Purchase Cost</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {" "}
                {data && "$" + data.asset.cost / 100}
              </span>
              {/* <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("cost");
                    setFieldLabel("Purchase Cost");
                    setPlaceholder("Enter the purchase cost...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span> */}
            </dd>
          </div>

          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Model</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.asset.model}</span>
              {/* <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("model");
                    setFieldLabel("Model");
                    setPlaceholder("Enter the model...");
                    setOpen(!open);
                  }}
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span> */}
            </dd>
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

// export default function Asset() {

//   if (loading) {
//     <p>Loading...</p>;
//   }

//   if (error) {
//     <p>Error! {error.message}</p>;
//   }

//   return (
//     <div>
//       {data && (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               Asset Information
//             </h3>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//             <dl className="sm:divide-y sm:divide-gray-200">
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Name</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {data.asset.name}
//                 </dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Cost</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {"$" + data.asset.cost}
//                 </dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Description
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {data.asset.note}
//                 </dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Serial</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {data.asset.serial}
//                 </dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Model</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {data.asset.model}
//                 </dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Date of Purchase
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {new Date(data.asset.dateOfPurchase).toString()}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
