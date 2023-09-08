//@ts-check

import React, { useEffect } from "react";
import { useState } from "react";
import { isOnlyNumbers, isOnlyLetters } from "../inputValidators";
import { validate } from "../validator";
import Input from "./Input";
import Messages from "./Messages";

/**
 *
 * @param {string} id
 * @param {string} value
 * @param {string} defaultValue
 * @param {function} setValue
 * @param {function[]} validationFns
 * @returns
 */
const InputParams = (id, value, defaultValue, setValue, validationFns) => {
  return { id, value, defaultValue, setValue, validationFns };
};

const PaymentForm = ({ messages, setMessages, clearMessages }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVC, setCVC] = useState("");

  return (
    <form onSubmit={() => {}}>
      <label>
        CARDHOLDER NAME
        <Input
          inputID="card-name"
          value={name}
          defaultValue="e.g. Jane Appleseed"
          setValue={setName}
          validationFns={[isOnlyLetters]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="card-name" />
      </label>
      <label>
        CARD NUMBER
        <Input
          inputID="card-number"
          value={cardNumber}
          defaultValue="e.g. 1234 5678 9123 0000"
          setValue={setCardNumber}
          validationFns={[isOnlyNumbers]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="card-number" />
      </label>
      <div className="flex-row">
        <label>EXP. DATE (MM/YY)</label>
        <Input
          inputID="month"
          value={month}
          defaultValue="MM"
          setValue={setMonth}
          validationFns={[isOnlyNumbers]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="month" />
        <Input
          inputID="year"
          value={year}
          defaultValue="YY"
          setValue={setYear}
          validationFns={[isOnlyNumbers]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="year" />
        <label>CVC</label>
      </div>
    </form>
  );
};

export default PaymentForm;
