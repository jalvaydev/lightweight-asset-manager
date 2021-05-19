import { useOktaAuth } from "@okta/okta-react";
import { USER } from "../graphql/queries/user";
import { useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import { useState } from "react";
import Alert from "../components/Alert";
import EditField from "../components/EditField";
import { Transition } from "@headlessui/react";

export default function User() {
  const { authState } = useOktaAuth();
  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const { error, data, refetch } = useQuery(USER, {
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
            refetch={refetch}
            id={authState.accessToken.claims.sub}
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.firstName}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.lastName}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.email}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.mobilePhone}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.title}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.department}
                </Transition>
              </span>
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
              <span className="flex-grow">
                <Transition
                  appear={true}
                  show={data !== null}
                  enter="transition-opacity duration-1000"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                >
                  {data && data.user.userType}
                </Transition>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
