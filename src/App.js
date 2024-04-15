import React, { useEffect, useRef, useState } from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { app } from "./firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import Header from "./Component/Header";
import MessageList from "./Component/MessageList";
import MessageForm from "./Component/MessageForm";
import LoginForm from "./Component/LoginForm";

const auth = getAuth(app);
const db = getFirestore(app);

// Handle logout
const logoutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "Message"), orderBy("createdAt", "asc"));

    const unSubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        // Check if user has displayName
        if (!userData.displayName) {
          // Fetch displayName from users collection
          const userDoc = await getUserDocument(userData.uid);
          setUser({ ...userData, displayName: userDoc.name });
        } else {
          setUser(userData);
        }
      } else {
        setUser(false);
      }
    });
    const unSubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unSubscribe();
      unSubscribeForMessage();
    };
  }, []);

  const getUserDocument = async (uid) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let userDoc = {};
    querySnapshot.forEach((doc) => {
      userDoc = doc.data();
    });
    return userDoc;
  };

  const handleMessageSubmit = async (message) => {
    try {
      await addDoc(collection(db, "Message"), {
        name: user.displayName,
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"white"} maxWidth={"container.lg"}>
          <VStack h={"full"} bg={"telegram.200"}>
            <Header onLogout={logoutHandler} />
            <MessageList messages={messages} user={user} />
            <div ref={divForScroll}></div>

            <MessageForm onSubmit={handleMessageSubmit} />
          </VStack>
        </Container>
      ) : (
        <LoginForm />
      )}
    </Box>
  );
}

export default App;
