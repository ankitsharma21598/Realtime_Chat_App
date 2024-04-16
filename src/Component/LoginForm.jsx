// LoginForm.js
import React, { useState } from "react";
import {
  Button,
  Container,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../firebase";
import RegistrationForm from "./RegistrationForm";
import image from "../img/speech-balloon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.warn("Please check your email and password!");
      // alert(error.message);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Container h={"100vh"} bg={"white"} maxWidth={"container.lg"}>
      {registering ? (
        <RegistrationForm />
      ) : (
        <VStack h={"full"} bg={"telegram.200"}>
          <ToastContainer position="top-center" />
          <img
            src={image}
            style={{
              width: "100px",
              height: "100px",
              display: "inline",
              marginTop: "100px",
            }}
            alt="logo"
          />
          <Text
            fontSize="3xl"
            as={"b"}
            color={"blue.500"}
            alignItems={"center"}
            marginBottom={"50px"}
          >
            Realtime Chat App
          </Text>
          <Text fontSize={"3xl"} as={"b"}>
            Login to your account
          </Text>
          <VStack spacing={4} h={"full"}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              bg={"white"}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              bg={"white"}
            />
            <HStack>
              <Button onClick={handleEmailLogin} colorScheme="purple">
                Login
              </Button>

              <Button onClick={handleGoogleLogin} colorScheme="red">
                Sign In with Google.
              </Button>
            </HStack>
            <Button onClick={() => setRegistering(true)}>
              {" "}
              Create new account.
            </Button>
          </VStack>
        </VStack>
      )}
    </Container>
  );
};

export default LoginForm;
