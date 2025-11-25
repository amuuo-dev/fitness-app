import { saveWorkout } from "../db/workouts";
import {
  ExerciseWithSets,
  Workout,
  WorkoutWithExercises,
} from "../types/models";
import { cleanExercise, getExerciseTotalWeight } from "./exerciseService";
import * as Crypto from "expo-crypto";
import { getCurrentWorkout, getWorkouts } from "../db/workouts";
import { getExercises } from "../db/exercise";

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

const addExercisesToWorkout = async (
  workout: Workout
): Promise<WorkoutWithExercises> => {
  const exercises = await getExercises(workout.id);
  const exercisesWithSet = exercises.map((exercise) => ({
    ...exercise,
    sets: [],
  }));

  return {
    ...workout,
    exercises: exercisesWithSet,
  };
};

export const getCurrentWorkoutWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();
    if (workout) {
      return await addExercisesToWorkout(workout);
    }
    return null;
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();

  return await Promise.all(workouts.map(addExercisesToWorkout));
};
