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
 * @param {string} inputID
 * @returns
 */

function App() {
  const [messages, setMessages] = useState([{}]);

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
