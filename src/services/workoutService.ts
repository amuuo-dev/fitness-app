import exercises from "../data/exercises";
import { saveWorkout } from "../db/workouts";
import { WorkoutWithExercises } from "../types/models";
import { cleanExercise, getExerciseTotalWeight } from "./exerciseService";
import * as Crypto from "expo-crypto";

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce((total, exercise) => {
    return total + getExerciseTotalWeight(exercise);
  }, 0);
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  //save workout when we create it
  saveWorkout(newWorkout);
  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanWorkout(workout);
  const finishedWorkout: WorkoutWithExercises = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };
  saveWorkout(finishedWorkout);
  return finishedWorkout;
};

export const cleanWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = workout.exercises
    .map(cleanExercise)
    .filter((e) => e !== null);

  return {
    ...workout,
    exercises: cleanedWorkout,
  };
};
