import React from "react";
import { View, Text } from "../../components/general/Themed";
import WorkoutHeader from "../../components/logger/WorkoutHeader";
import workouts from "../../data/dummyWorkouts";
import { FlatList } from "react-native";
import WorkoutExerciseItem from "../../components/logger/WorkoutExerciseItem";

const currentWorkout = workouts[0];

const CurrentWorkoutScreen = () => {
  return (
    <FlatList
      data={currentWorkout.exercises}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={<WorkoutHeader />}
    />
  );
};

export default CurrentWorkoutScreen;
