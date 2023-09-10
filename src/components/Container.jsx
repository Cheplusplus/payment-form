// @ts-check

import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import Success from "./Success";
// @ts-ignore
import colorCard from "../assets/colorCard.svg";
// @ts-ignore
import greyCard from "../assets/greyCard.svg";
// @ts-ignore
import gradBG from "../assets/gradBG.svg";
// @ts-ignore
import stripes from "../assets/stripes.svg";
import { cardNumberFormatter } from "../utils/formatters.js";
import { Message } from "../App";

let uiState = {
  name: "",
  cardNumber: "",
  month: "",
  year: "",
  cvc: "",
};

/**
 * Gets passed down to Payment form to update the uiState variables for display.
 * @param {string} key
 * @param {string} value
 */
const updateUI = (key, value) => {
  uiState[key] = value;
};

/**
 *
 * @param {object} p
 * @param {Message[]} p.messages
 * @param {function} p.setMessages
 * @param {function} p.clearMessages
 * @returns {import("react").ReactElement<any, any>}
 */
// @ts-ignore
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
          <img src={stripes} className="stripes" />
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
