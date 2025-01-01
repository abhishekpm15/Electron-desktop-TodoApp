import React from "react";

const Button = ({ type, handleAction }) => {
  const handleClick = () => {
    handleAction();
  };

  return (
    <button className="btn btn-neutral" onClick={handleClick}>
      {type === "add" ? "Add" : "Delete All"}
    </button>
  );
};

export default Button;
