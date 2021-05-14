import { useOktaAuth } from "@okta/okta-react";
import { USER } from "../graphql/queries/user";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "../components/Modal";
import { useState } from "react";
import { UPDATE_USER } from "../graphql/mutations/updateUser";
import Alert from "../components/Alert";

export default function User() {
  const { authState } = useOktaAuth();
  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const { error, data } = useQuery(USER, {
    variables: { id: authState.accessToken.claims.sub },
  });

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
          />
        </Modal>
      )}
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Profile Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and edit your profile information
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
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.firstName}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("firstName");
                    setFieldLabel("First Name");
                    setPlaceholder("Enter your first name...");
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
            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.lastName}</span>
              <span className="ml-4 flex-shrink-0">
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
              </span>
            </dd>
          </div>

          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow"> {data && data.user.email}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("email");
                    setFieldLabel("Email Address");
                    setPlaceholder("Enter your email address...");
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
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.mobilePhone}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("mobilePhone");
                    setFieldLabel("Phone number");
                    setPlaceholder("Enter your phone number...");
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
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.title}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("title");
                    setFieldLabel("Title");
                    setPlaceholder("Enter your job title...");
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
            <dt className="text-sm font-medium text-gray-500">Department</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.department}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setField("department");
                    setFieldLabel("Department");
                    setPlaceholder("Enter your the name of your department...");
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
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{data && data.user.userType}</span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}

function EditField({ user, open, setOpen, field, fieldLabel, placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const { authState } = useOktaAuth();
  const [updateUser] = useMutation(UPDATE_USER);

  function handleSubmit(evt) {
    evt.preventDefault();
    // send mutation for updating the field
    updateUser({
      variables: {
        input: {
          id: authState.accessToken.claims.sub,
          value: inputValue,
          field,
        },
      },
    });

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
