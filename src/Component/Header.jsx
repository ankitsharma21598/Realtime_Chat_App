// Header.js
import React from "react";
import { Button, Container, HStack, Text } from "@chakra-ui/react";
import image from "../img/speech-balloon.png";

const Header = ({ onLogout }) => {
  return (
    <Container p={"4"} maxW={"container.lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <Text fontSize="3xl" as={"b"} color={"blue.500"} alignItems={"center"}>
          <img
            src={image}
            style={{ width: "50px", height: "50px", display: "inline" }}
            alt="logo"
          />{"  "}
          Realtime Chat App
        </Text>
        <Button colorScheme="red" onClick={onLogout}>
          Logout
        </Button>
      </HStack>
    </Container>
  );
};

export default Header;
