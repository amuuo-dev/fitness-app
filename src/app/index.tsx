import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { View, Text } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButton title="Start New Workout" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
  },
});
