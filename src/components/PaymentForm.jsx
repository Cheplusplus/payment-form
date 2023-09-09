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
 * @param {string} p.name
 * @param {function} p.setName
 * @param {string} p.cardNumber
 * @param {function} p.setCardNumber
 * @param {string} p.month
 * @param {function} p.setMonth
 * @param {string} p.year
 * @param {function} p.setYear
 * @param {string} p.CVC
 * @param {function} p.setCVC
 * @returns
 */
const PaymentForm = ({
  messages,
  setMessages,
  clearMessages,
  paymentSucceeded,
  name,
  setName,
  cardNumber,
  setCardNumber,
  month,
  setMonth,
  year,
  setYear,
  CVC,
  setCVC,
}) => {
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
          .then((r) =>
            r.status === 200 ? paymentSucceeded(true) : "Failed to fetch data"
          )
          .then((r) => {
            r ? console.log(r) : console.log("Payment success!");
          });
      })();
    } else {
      newMessages.map((item) => {
        const element = document.querySelector(`#${item.recipient}`);
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
          inputItem("card-number", cardNumber, [isOnlyNumbers, cannotBeBlank]),
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
      />
      <Messages messages={messages} inputID="name" />
      <label>CARD NUMBER</label>
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
              />
            </div>
            <div>
              <Messages messages={messages} inputID="month" />
              <Messages messages={messages} inputID="year" />
            </div>
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
          />
          <Messages messages={messages} inputID="cvc" />
        </div>
      </div>
      <input type="submit" value={"Confirm"} id="submit-button" />
    </form>
  );
};

export default PaymentForm;
