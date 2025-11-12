import React from "react";
import { Text } from "../../components/general/Themed";
import { useLocalSearchParams } from "expo-router";
import WorkoutExerciseItem from "../../components/workouts/WorkoutExerciseItem";
import dummyWorkouts from "../../data/dummyWorkouts";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";

const WorkoutScreen = () => {
  const { id } = useLocalSearchParams();
  const workout = dummyWorkouts.find((w) => w.id === id);

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      contentContainerStyle={{ gap: 8, padding: 8 }}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Workout Details</Text>
          <Text style={styles.date}>
            {dayjs(workout.createdAt).format("HH:mm dddd, D MMM")}
          </Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default WorkoutScreen;
