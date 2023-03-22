import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./.expo/screens/LoginScreen";
import HomeScreen from "./.expo/screens/HomeScreen";
import LandingPage from "./.expo/screens/LandingPage";
import { Register } from "./.expo/screens/Register";
import { SignUp } from "./.expo/screens/signUp";
import TurnOnCamera from "./.expo/screens/Camera";
import Infomation from "./.expo/screens/Info";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing Page"
          component={LandingPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camera"
          component={TurnOnCamera}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Info"
          component={Infomation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E96479",
    alignItems: "center",
    justifyContent: "center",
  },
});
