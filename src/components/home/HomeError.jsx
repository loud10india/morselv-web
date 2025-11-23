import React from "react";

const HomeError = ({ message = "Location Services are not enabled" }) => {
  return <div className="text-center w-full font-bold text-xl">{message}</div>;
};

export default HomeError;
