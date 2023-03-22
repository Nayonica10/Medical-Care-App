import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
} from "react-native";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Register");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        cursorColor={"#56409e"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        cursorColor={"#56409e"}
        value={pass}
        onChangeText={(text) => setpass(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Camera");
        }}
      >
        <Text style={styles.text}>SCAN YOUR FACE</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          navigation.navigate("Info");
        }}
      >
        <Text>New User? Click here to register</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 60,
    width: 300,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#191825",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    textAlign: "center",
    color: "#191825",
    fontSize: 20,
  },

  button: {
    height: 60,
    width: 300,
    borderWidth: 1,
    borderRadius: 12,
    margin: 10,
    padding: 10,
    backgroundColor: "#56409e",
    justifyContent: "center",
  },
  text: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
});

export default LoginScreen;
