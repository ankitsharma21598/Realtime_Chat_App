// MessageList.js
import React, { useEffect, useRef } from "react";
import { VStack, Divider } from "@chakra-ui/react";
import { Message } from "./Message";

const MessageList = ({ messages, user }) => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <VStack
      h={"full"}
      w={"full"}
      overflowY={"auto"}
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
      bg={"telegram.100"}
    >
      {messages.map((item) => (
        <Message
          key={item.id}
          user={item.uid === user.uid ? "me" : "other"}
          text={item.text}
          uri={item.uri}
          name={item.name}
          time={item.createdAt}
        />
      ))}
      <Divider />
      <div ref={messageEndRef} />
    </VStack>
  );
};

export default MessageList;
