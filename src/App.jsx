import "./App.css";
import PaymentForm from "./components/PaymentForm";
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
 * @param {string} inputID
 * @returns
 */

function App() {
  const [messages, setMessages] = useState([{}]);

  const clearMessages = (inputID) =>
    setMessages((msgs) => msgs.filter((msg) => msg.recipient !== inputID));
  return (
    <>
      <PaymentForm
        messages={messages}
        setMessages={setMessages}
        clearMessages={clearMessages}
      />
    </>
  );
}

export default App;
