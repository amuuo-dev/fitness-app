import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { View, Text } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import Card from "../components/general/Card";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButton title="Start New Workout" />

      <Card title="Today's Workout" href="/workout/current">
        <Text>3 exercises • 25 minutes</Text>
      </Card>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
