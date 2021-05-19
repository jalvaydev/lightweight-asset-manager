import { UPDATE_USER } from "../graphql/mutations/updateUser";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_ASSET } from "../graphql/mutations/updateAsset";
export default function EditField({
  setOpen,
  field,
  fieldLabel,
  placeholder,
  assetId,
  refetch,
  id,
}) {
  const [inputValue, setInputValue] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateAsset] = useMutation(UPDATE_ASSET);

  async function handleSubmit(evt) {
    evt.preventDefault();
    // send mutation for updating the field
    if (!assetId) {
      await updateUser({
        variables: {
          input: {
            id,
            value: inputValue,
            field,
          },
        },
      });
      refetch({ id });
    } else {
      await updateAsset({
        variables: {
          input: {
            id: assetId,
            value: inputValue,
            field: field,
          },
        },
      });
    }

    setOpen(false);
  }

  return (
    <div>
      <label
        htmlFor={fieldLabel}
        className="block text-sm font-medium text-gray-700"
      >
        {fieldLabel}
      </label>
      <div className="mt-1">
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <input
            type="text"
            name={field}
            id={field}
            value={inputValue}
            onChange={(evt) => setInputValue(evt.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder}
          />
        </form>
      </div>
    </div>
  );
}
