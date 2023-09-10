//@ts-check

import React from "react";
import { validate } from "../utils/validator";
import { Message } from "../App";

/**
 *
 * @param {object} params
 * @prop {string} inputID
 * @prop {string} value
 * @prop {string} defaultValue
 * @prop {function} setValue
 * @prop {function[]} validationFns
 * @prop {function} setMessages
 * @prop {function} clearMessages
 * @returns
 */
const Input = ({
  inputID,
  value,
  defaultValue,
  setValue,
  validationFns,
  setMessages,
  clearMessages,
}) => {
  return (
    <input
      type="text"
      className={inputID}
      value={value !== "" ? value : defaultValue}
      onClick={(e) => {
        //@ts-ignore
        e.target.value === defaultValue
          ? //@ts-ignore
            (e.target.value = "")
          : null;
      }}
      onChange={(e) => {
        if (validationFns.length !== 0) {
          setValue(e.target.value);
          return;
        }
        const res = validate(e.target.value, validationFns);
        clearMessages(inputID);
        res === true
          ? setValue(e.target.value)
          : res.map((error) => {
              const newMessage = Message(inputID, error.toString());
              setMessages((msgs) => [...msgs, newMessage]);
            });
      }}
    />
  );
};

export default Input;
