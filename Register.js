import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { storage } from "../firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export const Register = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.assets[0].uri);
    setPicture(result.uri);
  };

  const uploadImage = async () => {
    //convert image to blob image

    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", picture, true);
      xhr.send(null);
    });

    //set metadata of image

    const metadata = {
      contentType: "image/jpeg",
    };

    //upload image on storage

    const storageRef = ref(storage, "Categories/" + Date.now());

    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          Alert.alert("Success", "Your picture is uploaded successfully", [
            {
              text: "LOGIN",
              onPress: () => () => {
                navigation.replace("Login");
              },
            },
          ]);
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Step 2</Text>
      <Image source={{ uri: image }} style={styles.imageStyle} />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.text}
          onPress={picture != null ? uploadImage : null}
        >
          Upload
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  imageStyle: {
    width: 100,
    height: 100,
  },
});
