import { ExerciseWithSets } from "../types/models";
import { getSetTotalWeight } from "./setService";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce((totalSetsWeight, set) => {
    return totalSetsWeight + getSetTotalWeight(set);
  }, 0);
};
