import React from "react";

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
