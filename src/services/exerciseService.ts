import { deleteExercise, saveExercise } from "../db/exercise";
import { getAllSets } from "../db/sets";
import { Exercise, ExerciseWithSets } from "../types/models";
import { cleanSets, createSet, getSetTotalWeight } from "./setService";
import * as Crypto from "expo-crypto";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce((totalSetsWeight, set) => {
    return totalSetsWeight + getSetTotalWeight(set);
  }, 0);
};

export const createExercise = (name: string, workoutId: string) => {
  const newExercise: ExerciseWithSets = {
    id: Crypto.randomUUID(),
    name,
    workoutId,
    sets: [],
  };

  saveExercise(newExercise);

  newExercise.sets.push(createSet(newExercise.id));

  return newExercise;
};

export const cleanExercise = (exercise: ExerciseWithSets) => {
  const cleanedSets = cleanSets(exercise.sets);

  if (cleanedSets.length === 0) {
    deleteExercise(exercise.id);
    return null;
  }

  return {
    ...exercise,
    sets: cleanedSets,
  };
};

export const addSetsToExercise = async (
  exercise: Exercise
): Promise<ExerciseWithSets> => {
  const sets = await getAllSets(exercise.id);
  return {
    ...exercise,
    sets,
  };
};
