import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import Success from "./Success";
import colorCard from "../assets/colorCard.svg";
import greyCard from "../assets/greyCard.svg";
import gradBG from "../assets/gradBG.svg";

let uiState = {
  name: "",
  cardNumber: "",
  month: "",
  year: "",
  cvc: "",
};

const updateUI = (key, value) => {
  uiState[key] = value;
};

const Container = ({ messages, setMessages, clearMessages }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div className="container">
      <img src={gradBG} className="gradBG" />
      <div className="colorCardContainer">
        <img src={colorCard} className="colorCard" />
        <p className="card-number">{uiState.cardNumber}</p>
      </div>
      <img src={greyCard} className="greyCard" />
      <div className="content">
        {!paymentSuccess ? (
          <PaymentForm
            messages={messages}
            setMessages={setMessages}
            clearMessages={clearMessages}
            paymentSucceeded={setPaymentSuccess}
            updateUI={updateUI}
          />
        ) : (
          <Success />
        )}
      </div>
    </div>
  );
};

export default Container;
