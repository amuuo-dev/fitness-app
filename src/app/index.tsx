import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { View, Text } from "../components/general/Themed";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Link href="/workout/current">
        <Text>current</Text>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
