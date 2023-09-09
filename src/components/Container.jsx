import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import Success from "./Success";
import colorCard from "../assets/colorCard.svg";
import greyCard from "../assets/greyCard.svg";
import gradBG from "../assets/gradBG.svg";

const Container = ({ messages, setMessages, clearMessages }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVC, setCVC] = useState("");

  return (
    <div className="container">
      <img src={gradBG} className="gradBG" />
      <div className="colorCardContainer">
        <img src={colorCard} className="colorCard" />
        <p className="card-number">{cardNumber.padEnd(16, "0")}</p>
      </div>
      <img src={greyCard} className="greyCard" />
      <div className="content">
        {!paymentSuccess ? (
          <PaymentForm
            messages={messages}
            setMessages={setMessages}
            clearMessages={clearMessages}
            paymentSucceeded={setPaymentSuccess}
            name={name}
            setName={setName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            CVC={CVC}
            setCVC={setCVC}
          />
        ) : (
          <Success />
        )}
      </div>
    </div>
  );
};

export default Container;
