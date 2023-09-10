//@ts-check
import React from "react";
import "./App.css";
import Container from "./components/Container";
import { useState } from "react";

/**
 *
 * @param {string} recipient
 * @param {string} text
 * @returns
 */
export const Message = (recipient, text) => {
  return {
    recipient: recipient,
    text: text,
  };
};

/**
 *
 * @returns {import("react").ReactElement<any, any>}
 */
function App() {
  const [messages, setMessages] = useState([Object()]);
  /**
   * @param {string} inputID
   * @returns
   */
  const clearRecipientsMessages = (inputID) => {
    setMessages((msgs) => msgs.filter((msg) => msg.recipient !== inputID));
  };

  return (
    <>
      <Container
        messages={messages}
        setMessages={setMessages}
        clearMessages={clearRecipientsMessages}
      />
    </>
  );
}

export default App;
