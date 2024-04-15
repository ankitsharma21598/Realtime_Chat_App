// MessageForm.js
import React, { useState } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "70%" }}>
      {showEmojiPicker && (
        <EmojiPicker
          style={{ position: "absolute", bottom: "70px", left: "35rem" }}
          onEmojiClick={handleEmojiClick}
        />
      )}
      <HStack p={'4'}>
        <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          backgroundColor={"white"}
          placeholder="Enter a message...."
        />
        <Button colorScheme="purple" type="submit">
          Send
        </Button>
      </HStack>
    </form>
  );
};

export default MessageForm;
