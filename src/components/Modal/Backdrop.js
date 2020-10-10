import React from "react";
import "./Backdrop.css";

export const Backdrop = ({ show, clicked }) => {
  return show ? <div className="back" onClick={clicked}></div> : null;
};

export default Backdrop;
