import React, { useState } from "react";
import { Modal, CloseButton, Button, Container, Form } from "react-bootstrap";
import "./chatbot.css";

export interface IModalPopUp {
  isModalOpen: boolean;
  modalClose: () => void;
}

const Chatbot = ({ isModalOpen, modalClose }: IModalPopUp) => {
  const [message, setMessage] = useState("");
  const [messageStore, setMessageStore] = useState([{ user: "", system: "" }]);

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    messageStore.concat({ ...messageStore, user: message });
    setMessageStore(messageStore.concat({ ...messageStore, user: message }));
    setMessage("");
    if (messageStore[0].system !== "") {
      setMessageStore([{ user: "", system: "" }]);
    }
    try {
      // const model = new ChatOpenAI({
      //   streaming: true,
      //   openAIApiKey: openAIKey,
      // });
      // console.log(process.env.OPEN_AI_KEY, "");

      // const memory = new BufferMemory();
      // const chain = new ConversationChain({ llm: model, memory });
      // const botReply = await chain.call({
      //   input: `Assume, you are a funny chatbot.${message}`,
      // });
      // const chat = new ChatOpenAI({
      //   streaming: true,
      //   openAIApiKey: "token",
      // });

      // const botReply = await chat.call(
      //   [`you are a funny chatbot.${message}`]
      // {
      //   callbacks: [
      //     {
      //       handleLLMNewToken(token: string) {
      //         console.log({ token });
      //       },
      //     },
      //   ],
      // }
      // );

      // const botReply = await chat.call([
      //   `you are a funny chatbot.${message}`,
      //   "system",
      // ]);

      // const openaiResponse = await axios.post(
      //   "https://api.openai.com/v1/chat/completions",
      //   {
      //     messages: [
      //       {
      //         role: "system",
      //         content: `you are a funny chatbot.${message}`,
      //       },
      //     ],
      //     model: "gpt-3.5-turbo",
      //   },
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer token",
      //     },
      //   }
      // );
      // const botReply = openaiResponse.data.choices[0].message.content;
      // new HumanMessage(message),
      //   new AIMessage(botReply.response),

      const botReply = await fetch("/api/speechToText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message}),
      });
      const data = await botReply.json();

      messageStore.concat({ user: message, system: data.message.response });
      setMessageStore(
        messageStore.concat({ user: message, system: data.message.response })
      );
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
    }
  };
  return (
    <Modal show={isModalOpen}>
      <Modal.Header>
        <h1>Funny Chatbot</h1>
        <CloseButton onClick={() => modalClose()} />
      </Modal.Header>
      <Modal.Body>
        <Container>
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
              </>
            ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="messageInput">
          <div className="messageCol col-10">
            <Form.Control
              placeholder="Type a message..."
              aria-describedby="basic-addon2"
              onChange={handleInputChange}
              value={message}
            />
          </div>
          <div className="btnSendCol col-2">
            <Button
              className="btnSend"
              variant="danger"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Chatbot;
