import React from "react";
import { HStack, Avatar, Text, Flex } from "@chakra-ui/react";
export const Message = ({ text, uri, user = "other", name, time }) => {
  // let time = new Date().toLocaleTimeString();
  // Convert Firestore timestamp to JavaScript Date object
  const jsTime = new Date(time?.seconds * 1000 + time?.nanoseconds / 1000000);

  // Format the JavaScript Date object as desired
  const formattedTime = jsTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // Format as HH:MM

  // Convert Firestore timestamp to JavaScript Date object
  const jsDate = new Date(time?.seconds * 1000 + time?.nanoseconds / 1000000);

  // Format the JavaScript Date object to a date string
  const formattedDate = jsDate.toLocaleDateString();

  // create a new message
  return (
    <>
      <Text fontSize="xs" color="gray.500">
        {" "}
        {formattedDate}
      </Text>
      <HStack
        mx={"1"}
        alignSelf={user === "me" ? "flex-end" : "flex-start"}
        bg={"gray.100"}
        padding={"1"}
        borderRadius={"lg"}
        maxW={"60%"}
      >
        {user === "other" && (
          <Avatar src={uri ? uri : "https://i.imgur.com/DY6gND0.png"} />
        )}

        <Flex direction="column" flex="1" alignSelf={"flex-end"}>
          <Text fontWeight="bold" mb="1">
            {name ? name : "Anonymous"}:
          </Text>
          <Text>{text}</Text>
          <Text
            fontSize="xs"
            color="gray.500"
            mt="1"
            alignSelf={user === "me" ? "flex-end" : "flex-start"}
          >
            <emoji>🕒</emoji> {formattedTime}
          </Text>
        </Flex>
        {user === "me" && (
          <Avatar src={uri ? uri : "https://i.imgur.com/DY6gND0.png"} />
        )}
      </HStack>
    </>
  );
};
