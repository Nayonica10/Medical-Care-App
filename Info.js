import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Infomation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Button mode="contained" onPress={() => UploadImage}>
            Name
          </Button>
          <Button mode="contained" onPress={() => UploadImage}>
            Email-Id
          </Button>
          <Button mode="contained" onPress={() => UploadImage}>
            Contact No.
          </Button>
          <Button mode="contained" onPress={() => UploadImage}>
            address
          </Button>

          <Button mode="contained" onPress={() => UploadImage}>
            Blood Group
          </Button>

          <Button mode="contained" onPress={() => UploadImage}>
            Create your Username*
          </Button>

          <Button mode="contained" onPress={() => UploadImage}>
            Password*
          </Button>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.text}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
