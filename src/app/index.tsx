import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList, Text } from "react-native";
import { View } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import WorkoutListItem from "../components/workouts/WorkoutListItem";
import { router } from "expo-router";
import { useWorkouts } from "../store";

export default function App() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const startWorkout = useWorkouts((state) => state.startWorkout);
  const workouts = useWorkouts((state) => state.workouts);

  const onStartWorkout = () => {
    startWorkout();
    router.push("/workout/current");
  };

  return (
    <View style={styles.container}>
      {currentWorkout ? (
        <CustomButton
          title="Resume workout"
          onPress={() => router.push("/workout/current")}
        />
      ) : (
        <CustomButton title="Start new workout" onPress={onStartWorkout} />
      )}

      {workouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No workouts available !</Text>
          <Text style={styles.emptySubText}>
            Start and Finish a workout to see it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={({ item }) => <WorkoutListItem workout={item} />}
          contentContainerStyle={{ gap: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
