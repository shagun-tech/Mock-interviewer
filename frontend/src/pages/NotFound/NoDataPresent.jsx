import React from "react";
import NoData from "../../assets/no-data.svg";

function NoDataPresent({ message }) {
  return (
    <div className="grid h-[88vh] place-content-center px-4">
      <div className="text-center">
        <img
          className="bg-secondary rounded-full"
          src={NoData}
          alt="not-found"
        />
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-4xl">
          Uh-oh!
        </h1>

        <p className="mt-4 ">{message}</p>
      </div>
    </div>
  );
}

export default NoDataPresent;
