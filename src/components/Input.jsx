//@ts-check

import React from "react";
import { validate } from "../utils/validator";
import { Message } from "../App";

/**
 *
 * @param {object} p
 * @param {string} p.inputID
 * @param {string} p.value
 * @param {string} p.defaultValue
 * @param {function} p.setValue
 * @param {function} p.setMessages
 * @param {function} p.clearMessages
 * @param {function | null} [p.valueFormatter]
 * @param {number} [p.maxLength]
 * @param {function[]} [p.validationFns]
 * @param {function|null} [p.updateUI]
 *
 * @returns
 */
const Input = ({
  inputID,
  value,
  defaultValue,
  setValue,
  setMessages,
  clearMessages,
  valueFormatter = null,
  maxLength = 40,
  validationFns = [],
  updateUI = null,
}) => {
  return (
    <input
      type="text"
      id={inputID}
      value={value}
      placeholder={defaultValue}
      maxLength={maxLength}
      onFocus={(e) => {
        e.target.classList.add("selected");
      }}
      onBlur={(e) => {
        valueFormatter !== null && e.target.value !== defaultValue
          ? setValue(valueFormatter(e.target.value))
          : null;
        e.target.classList.remove("selected");
      }}
      onChange={(e) => {
        setValue((v) => e.target.value);
        updateUI !== null ? updateUI(inputID, e.target.value) : null;
        if (validationFns.length === 0) {
          return;
        }
        const res = validate(e.target.value, validationFns);
        clearMessages(inputID);
        if (res === true) {
          e.target.classList.remove("input-error");
        } else {
          res.map((error) => {
            const newMessage = Message(inputID, error);
            setMessages((msgs) => [...msgs, newMessage]);
          });
          e.target.classList.add("input-error");
        }
      }}
    />
  );
};

export default Input;
