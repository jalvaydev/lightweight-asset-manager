import { CREATE_MODEL } from "../graphql/mutations/createModel";
import { CREATE_ASSET } from "../graphql/mutations/createAsset";
import { MODELS } from "../graphql/queries/models";
import { ASSETS } from "../graphql/queries/assets";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-date-picker";
import ModelCreator from "./ModelCreator";
import Alert from "./Alert";

export default function AssetCreator({ setAssetCreator }) {
  const [createModel] = useMutation(CREATE_MODEL, {
    update: (cache) => {
      cache.modify({
        fields: {
          models(existingModels = []) {
            const newModel = cache.writeQuery({
              data: createModel,
              query: MODELS,
            });
            return [...existingModels, newModel];
          },
        },
      });
    },
  });

  const [createAsset] = useMutation(CREATE_ASSET, {
    update: (cache) => {
      cache.modify({
        fields: {
          assets(existingAssets = []) {
            const newAsset = cache.writeQuery({
              data: createAsset,
              query: ASSETS,
            });
            return [...existingAssets, newAsset];
          },
        },
      });
    },
  });
  const { data } = useQuery(MODELS);

  const [showModelCreator, setModelCreator] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [cost, setCost] = useState("");
  const [serial, setSerial] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createAsset({
        variables: {
          input: {
            name,
            note: notes,
            cost: convertToCents(cost),
            serial,
            model,
            status,
            dateOfPurchase,
          },
        },
      });
      setAssetCreator(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const convertToCents = (money) => {
    if (money === undefined) {
      return;
    }

    if (money.includes(".") && money.split(".")[1].length !== 2) {
      money.split(".")[1].length === 0
        ? (money = money.concat("00"))
        : (money = money.concat("0"));
    } else if (!money.includes(".")) {
      money = money.concat("00");
    }

    return parseInt(money.split(".").join(""));
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Asset Creation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your asset using this menu, click cancel to stop the
              creation or save to submit the new asset.
            </p>
            {errorMessage && (
              <Alert text="An unexpected error has occurred..." />
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <div>
                <select
                  name="model"
                  id="model"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option> </option>
                  {data &&
                    data.models.map((model) => (
                      <option value={model.name} key={model.name}>
                        {model.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() => setModelCreator(!showModelCreator)}
                  className="inline-flex items-center px-2.5 py-1.5 mt-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  New
                </button>
              </div>
              {showModelCreator && (
                <ModelCreator
                  setModelCreator={setModelCreator}
                  createModel={createModel}
                />
              )}
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Serial
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="serial"
                  id="serial"
                  required
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="status"
                  id="status"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Date of Purchase
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <DatePicker
                  value={dateOfPurchase}
                  onChange={setDateOfPurchase}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Cost
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      $
                    </span>
                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="Please enter a number"
                      defaultValue={0}
                      decimalsLimit={2}
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onValueChange={(value) => setCost(value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="Notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Any notes regarding the item.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setAssetCreator(false)}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
