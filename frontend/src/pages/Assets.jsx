import { useQuery, gql, useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-date-picker";

const ASSETS = gql`
  query Assets {
    assets {
      name
      id
      note
      cost
      serial
      model
      status
      dateOfPurchase
    }
  }
`;

const CREATE_ASSET = gql`
  mutation CreateAsset($input: NewAsset!) {
    createAsset(input: $input) {
      id
      name
      note
      cost
      serial
      model
      status
      dateOfPurchase
    }
  }
`;

const MODELS = gql`
  query Models {
    models {
      name
      id
      manufacturer
      modelno
    }
  }
`;

const CREATE_MODEL = gql`
  mutation CreateModel($input: NewModel!) {
    createModel(input: $input) {
      name
      manufacturer
      modelno
    }
  }
`;

function AssetCreator({ setAssetCreator }) {
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
  const { loading, error, data } = useQuery(MODELS);

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
      console.log("name: ", name);
      console.log("notes: ", notes);
      console.log("cost: ", convertToCents(cost));
      console.log("serial: ", serial);
      console.log("model: ", model);
      console.log("status: ", status);
      console.log("dateOfPurchase: ", dateOfPurchase.toJSON());

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
      console.log(err);
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
            {errorMessage && <p>{errorMessage}</p>}
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
                  <option value="hello">Hello</option>
                  {data &&
                    data.models.map((model) => (
                      <option value={model.modelno} key={model.modelno}>
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

function ModelCreator({ setModelCreator, createModel }) {
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

function Modal({ openAssetCreator, setAssetCreator }) {
  return (
    <Transition.Root show={openAssetCreator} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={openAssetCreator}
        onClose={setAssetCreator}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <AssetCreator
                setAssetCreator={setAssetCreator}
                openAssetCreator={openAssetCreator}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function Assets() {
  const { loading, error, data } = useQuery(ASSETS);
  const [openAssetCreator, setAssetCreator] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    data.assets.map((a) => console.log(a));
  }
  return (
    <div>
      {openAssetCreator && (
        <Modal
          setAssetCreator={setAssetCreator}
          openAssetCreator={openAssetCreator}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Assets</h1>
      </div>
      <div className="relative mb-5 w-100 h-10">
        <button
          type="button"
          onClick={() => setAssetCreator(true)}
          className="absolute top-0 right-10 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create an asset
        </button>
      </div>
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
                    >
                      Name
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purchase Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.assets.map((asset) => (
                    <tr
                      key={asset.id}
                      onClick={() => console.log("ya done clicked!")}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {asset.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.dateOfPurchase}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.serial}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {"$" + asset.cost / 100}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={`/edit/${asset.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
