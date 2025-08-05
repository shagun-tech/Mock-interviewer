import React from "react";
import NotFoundImage from "../../assets/not-found-image.svg";

function NotFound() {
  return (
    <div className="grid h-[88vh] place-content-center px-4">
      <div className="text-center">
        <img className="bg-secondary rounded-full" src={NotFoundImage} alt="not-found" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-4xl">
          Uh-oh!
        </h1>

        <p className="mt-4 ">Sorry , Something went Wrong</p>
      </div>
    </div>
  );
}

export default NotFound;
