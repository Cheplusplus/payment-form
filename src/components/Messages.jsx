import React from "react";

const Messages = ({ messages, inputID }) => {
  return (
    <ul>
      {messages.map((msg, i) => {
        return msg.recipient === inputID ? <li key={i}>{msg.text}</li> : null;
      })}
    </ul>
  );
};

export default Messages;
