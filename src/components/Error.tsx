import React from "react";

import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Error: FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <img
        className="w-full max-w-[200px] h-auto"
        src="/error.png"
        alt="Error"
      />
      <p className="text-xl">Something went wrong!</p>
      {location.pathname !== "/" && (
        <Link className="text-primary" to="/">
          Return home
        </Link>
      )}
    </div>
  );
};

export default Error;
