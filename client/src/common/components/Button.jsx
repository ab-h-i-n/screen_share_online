import React, { useEffect, useState } from "react";

const Button = ({ children, onClick, bgColor }) => {
  const [shadowColor, setShadowColor] = useState("shadow-sky-600");

  useEffect(() => {
    if (bgColor) {
      setShadowColor("shadow-" + bgColor?.split("bg-")[1]);
    }
  }, [bgColor]);

  return (
    <>
      <button
        className={`text-white font-medium py-3 px-5 rounded cursor-pointer hover:brightness-90 hover:shadow-2xl  hover:${shadowColor}  ${
          bgColor || "bg-sky-600"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
