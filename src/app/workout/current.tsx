import React from "react";
import WorkoutHeader from "../../components/logger/WorkoutHeader";
import workouts from "../../data/dummyWorkouts";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import WorkoutExerciseItem from "../../components/logger/WorkoutExerciseItem";
import SelectExerciseModal from "../../components/logger/SelectExerciseModal";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomButton from "../../components/general/CustomButton";
import { Stack } from "expo-router";

const currentWorkout = workouts[0];

const CurrentWorkoutScreen = () => {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              title="Finish"
              style={{ padding: 7, paddingHorizontal: 15, width: "auto" }}
              onPress={() => console.log("finish")}
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
          ListFooterComponent={<SelectExerciseModal />}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default CurrentWorkoutScreen;
