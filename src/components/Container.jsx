//@ts-check
import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import Success from "./Success";

const Container = ({ messages, setMessages, clearMessages }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  return (
    <>
      {!paymentSuccess ? (
        <PaymentForm
          messages={messages}
          setMessages={setMessages}
          clearMessages={clearMessages}
          paymentSucceeded={setPaymentSuccess}
        />
      ) : (
        <Success />
      )}
    </>
  );
};

export default Container;
