//@ts-check
import React from "react";

/**
 *
 * @param {object} p
 * @param {object[]} p.messages
 * @param {string} p.inputID
 * @returns {import("react").ReactElement<any, any>}
 */
const Messages = ({ messages, inputID }) => {
  return (
    <ul className="message-list">
      {messages.map((msg, i) => {
        return msg.recipient === inputID ? (
          <li key={i} className="message">
            {msg.text}
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default Messages;
