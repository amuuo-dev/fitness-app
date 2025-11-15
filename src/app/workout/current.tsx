import React from "react";
import WorkoutHeader from "../../components/logger/WorkoutHeader";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import WorkoutExerciseItem from "../../components/logger/WorkoutExerciseItem";
import SelectExerciseModal from "../../components/logger/SelectExerciseModal";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomButton from "../../components/general/CustomButton";
import { Redirect, Stack } from "expo-router";
import { useWorkouts } from "../../store";

const CurrentWorkoutScreen = () => {
  const headerHeight = useHeaderHeight();

  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const finishWorkout = useWorkouts((state) => state.finishWorkout);
  const addExercise = useWorkouts((state) => state.addExercise);

  if (!currentWorkout) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              title="Finish"
              style={{ padding: 7, paddingHorizontal: 15, width: "auto" }}
              onPress={() => finishWorkout()}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={currentWorkout.exercises}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name) => addExercise(name)}
            />
          }
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default CurrentWorkoutScreen;
