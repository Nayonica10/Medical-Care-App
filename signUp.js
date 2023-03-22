import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered with:", user.email);
        Alert.alert("Success", "Upload your picture"),
          [
            {
              text: "NEXT",
              onPress: () => () => {
                navigation.navigate("Register");
              },
            },
          ];
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <Text style={styles.text}>Step 1</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text}>NEXT</Text>
      </TouchableOpacity>
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
