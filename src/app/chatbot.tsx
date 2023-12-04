import React, { useState } from "react";
import { Button, Container, Form, FormCheck, Image } from "react-bootstrap";
import "./chatbot.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messageStore, setMessageStore] = useState([{ user: "", system: "", images: [] }]);
  const [isImageGeneration, setIsImageGeneration] = useState(false);

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    messageStore.concat({ ...messageStore, user: message });
    setMessageStore(messageStore.concat({ ...messageStore, user: message }));
    setMessage("");
    if (messageStore[0].system !== "") {
      setMessageStore([{ user: "", system: "", images: [] }]);
    }
    try {
      const botReply = await fetch(`/api/${isImageGeneration ? "textToImage" : "speechToText"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await botReply.json();
      messageStore.concat({ user: message, system: data.message ? data.message.response : messageStore[messageStore.length]?.system, images: data.images ? data.images : [] });
      setMessageStore(
        messageStore.concat({ user: message, system: data.message ? data.message.response : messageStore[messageStore.length]?.system, images: data.images ? data.images : [] })
      );
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
    }
  };

  return (
    <Container>
      <div className="w-100">
        {messageStore.length > 1 &&
          messageStore.map((it) => (
            <>
              {it.user && (
                <div className="right">
                  <div className="bot-message">{it.user}</div>
                </div>
              )}
              {it.system && (
                <div className="left">
                  <div className="bot-message">{it.system}</div>
                </div>
              )}
              {
                it.images && it.images.length > 1 &&
                it.images.map((it: { url: string }) => {
                  return (
                    <div className="bot-message">
                      <Image src={it?.url} />
                    </div>
                  )
                })
              }
            </>
          ))}
      </div>
      <div className="messageInput">
        <div className="col-10">
          <Form.Control
            placeholder="Type a message..."
            aria-describedby="basic-addon2"
            onChange={handleInputChange}
            value={message}
          />
        </div>
        <div className="btnSendCol col-1">
          <FormCheck
            label="Image"
            checked={isImageGeneration}
            onChange={() => {
              setIsImageGeneration(!isImageGeneration)
            }}
          />
        </div>
        <div className="btnSendCol col-1">
          <Button
            variant="danger"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Chatbot;
