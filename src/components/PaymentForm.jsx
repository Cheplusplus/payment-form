//@ts-check
import React from "react";
import { useState } from "react";
import {
  isOnlyNumbers,
  isOnlyLetters,
  cannotBeBlank,
} from "../utils/inputValidators";
import { validate } from "../utils/validator";
import Input from "./Input";
import Messages from "./Messages";
import { Message } from "../App";
import { checkSum } from "../utils/luhn";

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
 * @param {string} cardNumber
 * @returns {string}
 */
export const cardNumberFormatter = (cardNumber) => {
  cardNumber = cardNumber.split(" ").join("");
  let pattern = /(.{4})(?! )/g;
  let outputString = cardNumber.replace(pattern, "$1 ");
  return outputString;
};

/**
 *
 * @param {object} p
 * @param {{}[]} p.messages
 * @param {function} p.setMessages
 * @param {function} p.clearMessages
 * @param {function} p.paymentSucceeded
 * @param {function} p.updateUI
 * @returns
 */
const PaymentForm = ({
  messages,
  setMessages,
  clearMessages,
  paymentSucceeded,
  updateUI,
}) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVC, setCVC] = useState("");

  /**
   *
   * @param {object[]} inputItems
   */
  const handleSubmit = (inputItems) => {
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
          .then((r) => {
            if (r.status === 200) {
              paymentSucceeded(true);
              return r.text();
            } else return "Failed to send data";
          })
          .then((r) => {
            console.log(r);
          });
      })();
    } else {
      newMessages.map((item) => {
        const element = document.querySelector(`.${item.recipient}`);
        element?.classList.add("input-error");
      });
      setMessages((msgs) => [...msgs, ...newMessages]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const inputItems = [
          inputItem("name", name, [isOnlyLetters, cannotBeBlank]),
          inputItem("cardNumber", cardNumber, [
            isOnlyNumbers,
            cannotBeBlank,
            checkSum,
          ]),
          inputItem("month", month, [isOnlyNumbers, cannotBeBlank]),
          inputItem("year", year, [isOnlyNumbers, cannotBeBlank]),
          inputItem("cvc", CVC, [isOnlyNumbers, cannotBeBlank]),
        ];
        handleSubmit(inputItems);
      }}
    >
      <label>CARDHOLDER NAME</label>
      <Input
        inputID="name"
        value={name}
        defaultValue="e.g. Jane Appleseed"
        setValue={setName}
        validationFns={[isOnlyLetters]}
        setMessages={setMessages}
        clearMessages={clearMessages}
        updateUI={updateUI}
      />
      <Messages messages={messages} inputID="name" />
      <label>CARD NUMBER</label>
      <Input
        inputID="cardNumber"
        value={cardNumber}
        maxLength={19}
        defaultValue="e.g. 1234 5678 9123 0000"
        setValue={setCardNumber}
        valueFormatter={cardNumberFormatter}
        validationFns={[isOnlyNumbers]}
        setMessages={setMessages}
        clearMessages={clearMessages}
        updateUI={updateUI}
      />
      <Messages messages={messages} inputID="cardNumber" />

      <div className="flex-row">
        <div>
          <label>EXP. DATE (MM/YY)</label>
          <div className="flex-col width100">
            <div className="flex-row">
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
                updateUI={updateUI}
              />
              <Input
                inputID="year"
                value={year}
                defaultValue="YY"
                setValue={setYear}
                maxLength={2}
                validationFns={[isOnlyNumbers]}
                setMessages={setMessages}
                clearMessages={clearMessages}
                updateUI={updateUI}
              />
            </div>
            <Messages messages={messages} inputID="month" />
            <Messages messages={messages} inputID="year" />
          </div>
        </div>
        <div className="flex-col">
          <label>CVC</label>
          <Input
            inputID="cvc"
            value={CVC}
            maxLength={3}
            defaultValue="e.g. 123"
            setValue={setCVC}
            validationFns={[isOnlyNumbers]}
            setMessages={setMessages}
            clearMessages={clearMessages}
            updateUI={updateUI}
          />
          <Messages messages={messages} inputID="cvc" />
        </div>
      </div>
      <input type="submit" value={"Confirm"} className="submit-button" />
    </form>
  );
};

export default PaymentForm;
