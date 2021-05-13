import { useState } from "react";

export default function ModelCreator({ setModelCreator, createModel }) {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [modelNo, setModelNo] = useState("");

  const handleSubmit = async () => {
    await createModel({
      variables: {
        input: {
          name,
          manufacturer,
          modelno: modelNo,
        },
      },
    });
    setModelCreator(false);
  };

  return (
    <div className="space-y-8 divide-y divide-gray-200 px-4 py-2 mt-2 border-solid border-4 border-light-blue-500">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Model Creation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a new model using this menu.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Model Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="model name"
                  id="model_name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  required
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Model No.
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="model number"
                  id="model_no"
                  required
                  value={modelNo}
                  onChange={(e) => setModelNo(e.target.value)}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setModelCreator(false)}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
