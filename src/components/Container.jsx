import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import Success from "./Success";
import colorCard from "../assets/colorCard.svg";
import greyCard from "../assets/greyCard.svg";
import gradBG from "../assets/gradBG.svg";
import { cardNumberFormatter } from "./PaymentForm";

let uiState = {
  name: "",
  cardNumber: "",
  month: "",
  year: "",
  cvc: "",
};

/**
 *
 * @param {string} key
 * @param {string} value
 */
const updateUI = (key, value) => {
  uiState[key] = value;
};

const Container = ({ messages, setMessages, clearMessages }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div className="container flex-row">
      <div className="cards-container">
        <img src={gradBG} className="gradBG" />
        <div className="colorCardContainer">
          <img src={colorCard} className="colorCard" />
          <p className="card-number card-text">
            {cardNumberFormatter(uiState.cardNumber.padEnd(16, "0"))}
          </p>
          <p className="card-name card-text">
            {uiState.name === "" ? "Jane Appleseed" : uiState.name}
          </p>
          <p className="date card-text">
            {uiState.month.padStart(2, "0")}/{uiState.year.padStart(2, "0")}
          </p>
        </div>
        <div className="greyCardContainer">
          <img src={greyCard} className="greyCard" />
          <p className="cvc-ui card-text">{uiState.cvc.padEnd(3, "0")}</p>
        </div>
      </div>
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
