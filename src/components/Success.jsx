import React from "react";
import checkMark from "../assets/checkMark.svg";

const Success = () => {
  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <img src={checkMark} />
      <h1>THANK YOU!</h1>
      <p>We've added your card details</p>
      <input type="submit" value="Continue" className="submit-button" />
    </div>
  );
};

export default Success;
