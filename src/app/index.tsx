import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList } from "react-native";
import { View, Text } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import WorkoutListItem from "../components/workouts/WorkoutListItem";
import workouts from "../data/dummyWorkouts";
import { router } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Start New Workout"
        onPress={() => router.push("/workout/current")}
      />

      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
