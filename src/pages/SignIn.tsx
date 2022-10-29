import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { FC, Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import Title from "../components/Title";
import { useQueryParams } from "../hooks/useQueryParams";
import { auth } from "../shared/firebase";
import { useStore } from "../store";

const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = useStore((state) => state.currentUser);

  const queryParams = useQueryParams();

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((response) => console.log(response.user))
      .catch((error) => setError(`Error: ${error.code}`))
      .finally(() => setLoading(false));
  };

  if (currentUser) {
    return <Navigate to={queryParams.get("redirect") || "/"} />;
  }

  return (
    <Fragment>
      <Title value="Sign In - FilmHot" />
      <div className="min-h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full min-h-screen flex justify-center items-center bg-[#00000056]">
          <div className="w-[90vw] max-w-[350px] bg-black p-10 flex flex-col items-center gap-6 rounded-xl">
            <h1 className="text-3xl font-semibold">Sign In</h1>

            {error && (
              <div className="p-3 bg-red-200 text-red-600 border border-red-400 rounded w-full">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              onClick={() => handleSignIn(new GoogleAuthProvider())}
              className="w-full flex items-center gap-3 p-3 text-black rounded-md bg-white cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:cursor-default transition duration-300"
            >
              <img className="w-6 h-6" src="/google.svg" alt="" />
              <span>Sign in with Google</span>
            </button>

            <button
              disabled={loading}
              onClick={() => handleSignIn(new FacebookAuthProvider())}
              className="w-full flex items-center gap-3 p-3 text-white bg-primary rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:cursor-default transition duration-300"
            >
              <img className="w-6 h-6" src="/facebook.svg" alt="" />
              <span>Sign in with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
