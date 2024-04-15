// RegistrationForm.js
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
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";
import LoginForm from "./LoginForm";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import image from "../img/speech-balloon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loging, setLoging] = useState(false);

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //  create a collection for user

      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      // You can do additional tasks after registration, such as sending a verification email
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use!");
      }
      toast.error("Please check your email and password!");
    }
  };
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Container h={"100vh"} maxWidth={"container.lg"}>
      {loging ? (
        <LoginForm />
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
            Register
          </Text>
          <VStack spacing={4} align="center">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              bg={"white"}
            />
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
              <Button onClick={handleRegistration} colorScheme="purple">
                Register
              </Button>
              <Button onClick={handleGoogleLogin} colorScheme="red">
                Sign In with Google
              </Button>
            </HStack>
            <Button onClick={() => setLoging(true)}>
              {" "}
              Already have an account
            </Button>
          </VStack>
        </VStack>
      )}
    </Container>
  );
};

export default RegistrationForm;
