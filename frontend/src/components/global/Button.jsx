import React from "react";

const Button = ({ isSmall = false, text }) => {
  if (isSmall) {
    return (
      <button className="px-3 py-2 bg-primary inline-block rounded-lg">
        <p className="text-sm capitalize text-white  font-semibold">{text}</p>
      </button>
    );
  } else
    return (
      <button className="px-6 py-3 bg-primary inline-block">
        <p className="text-md uppercase font-semibold text-black">{text}</p>
      </button>
    );
};

export default Button;
