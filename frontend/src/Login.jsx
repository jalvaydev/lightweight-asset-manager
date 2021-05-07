import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

export default function Login() {
  const { oktaAuth, authState } = useOktaAuth();
  let history = useHistory();

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  if (authState.isAuthenticated) {
    console.log("Already signed in...");
    history.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Lightweight Asset Management System
            </h2>
            <p className="mt-2 text-sm text-gray-600">Proof of Concept Build</p>
          </div>

          <div className="mt-8">
            <div>
              <button
                onClick={login}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
