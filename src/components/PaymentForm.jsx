//@ts-check
import React from "react";
import { useState } from "react";
import {
  isOnlyNumbers,
  isOnlyLetters,
  cannotBeBlank,
} from "../inputValidators";
import Input from "./Input";
import Messages from "./Messages";
import { validate } from "../validator";
import { Message } from "../App";

const JSONFileURL = "mock_server.json";

/**
 *
 * @param {string} id
 * @param {string} value
 * @param {function[]} validatorFns
 * @returns
 */
const inputItem = (id, value, validatorFns) => {
  return {
    id: id,
    value: value,
    validatorFns: validatorFns,
  };
};

/**
 *
 * @param {string} month
 * @returns {string}
 */
const monthFormatter = (month) => {
  return month.length === 1 ? month.padStart(2, "0") : month;
};

/**
 *
 * @param {object} p
 * @param {{}[]} p.messages
 * @param {function} p.setMessages
 * @param {function} p.clearMessages
 * @param {function} p.paymentSucceeded
 * @returns
 */
const PaymentForm = ({
  messages,
  setMessages,
  clearMessages,
  paymentSucceeded,
}) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVC, setCVC] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const inputItems = [
          inputItem("name", name, [isOnlyLetters, cannotBeBlank]),
          inputItem("card-number", cardNumber, [isOnlyNumbers, cannotBeBlank]),
          inputItem("month", month, [isOnlyNumbers, cannotBeBlank]),
          inputItem("year", year, [isOnlyNumbers, cannotBeBlank]),
          inputItem("cvc", CVC, [isOnlyNumbers, cannotBeBlank]),
        ];
        const newMessages = [];
        const JSONData = {};
        inputItems.map((item) => {
          clearMessages(item.id);
          JSONData[item.id] = item.value;
          const res = validate(item.value, item.validatorFns);
          res === true
            ? null
            : res.map((msg) => newMessages.unshift(Message(item.id, msg)));
        });
        if (newMessages.length === 0) {
          (async () => {
            await fetch(JSONFileURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(JSONData),
            })
              .then((r) => r.text())
              .then((r) => console.log(r))
              .then(() => paymentSucceeded(true));
          })();
        } else {
          newMessages.map((item) => {
            const element = document.querySelector(`#${item.recipient}`);
            element?.classList.add("input-error");
          });
          setMessages((msgs) => [...msgs, ...newMessages]);
        }
      }}
    >
      <label>
        CARDHOLDER NAME
        <Input
          inputID="name"
          value={name}
          defaultValue="e.g. Jane Appleseed"
          setValue={setName}
          validationFns={[isOnlyLetters]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="name" />
      </label>
      <label>
        CARD NUMBER
        <Input
          inputID="card-number"
          value={cardNumber}
          maxLength={16}
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
          maxLength={2}
          defaultValue="MM"
          setValue={setMonth}
          valueFormatter={monthFormatter}
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
          maxLength={2}
          validationFns={[isOnlyNumbers]}
          setMessages={setMessages}
          clearMessages={clearMessages}
        />
        <Messages messages={messages} inputID="year" />
        <label>
          CVC
          <Input
            inputID="cvc"
            value={CVC}
            maxLength={3}
            defaultValue="e.g. 123"
            setValue={setCVC}
            validationFns={[isOnlyNumbers]}
            setMessages={setMessages}
            clearMessages={clearMessages}
          />
          <Messages messages={messages} inputID="cvc" />
        </label>
      </div>
      <input type="submit" />
    </form>
  );
};

export default PaymentForm;
