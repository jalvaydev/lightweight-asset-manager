import { USERS } from "../graphql/queries/users";
import { useQuery } from "@apollo/client";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import Modal from "../components/Modal";
import UserCreator from "../components/UserCreator";

export default function Users() {
  const { data } = useQuery(USERS);
  const { oktaAuth } = useOktaAuth();
  const [userCreator, setUserCreator] = useState(false);
  const [admin, setAdmin] = useState(false);

  oktaAuth.tokenManager.get("accessToken").then((token) => {
    if (token.claims.admin) {
      setAdmin(true);
    }
  });

  return (
    <div>
      {userCreator && (
        <Modal open={userCreator} setOpen={setUserCreator}>
          <UserCreator
            setUserCreator={setUserCreator}
            userCreator={userCreator}
          />
        </Modal>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      </div>
      {admin && (
        <div className="relative mb-5 w-100 h-10">
          <button
            type="button"
            onClick={() => setUserCreator(true)}
            className="absolute top-0 right-10 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create a user
          </button>
        </div>
      )}
      <div className="flex flex-col pt-10">
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
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data.users.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {person.firstName + " " + person.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!person.userType ? "User" : person.userType}
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
