//@ts-check

import React from "react";
import { validate } from "../validator";
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
}) => {
  return (
    <input
      type="text"
      id={inputID}
      value={value !== "" ? value : defaultValue}
      maxLength={maxLength}
      onFocus={(e) => {
        //@ts-ignore
        e.target.value === defaultValue
          ? //@ts-ignore
            (e.target.value = "")
          : null;
      }}
      onBlur={(e) => {
        e.target.value = e.target.value !== "" ? e.target.value : defaultValue;
        valueFormatter !== null && e.target.value !== defaultValue
          ? (e.target.value = valueFormatter(e.target.value))
          : null;
      }}
      onChange={(e) => {
        setValue(e.target.value);
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
