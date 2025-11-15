import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList } from "react-native";
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

  console.log("the current workout", currentWorkout);
  console.log(JSON.stringify(workouts, null, 2));

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
