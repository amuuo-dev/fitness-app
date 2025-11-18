import { create } from "zustand";
import { ExerciseSet, WorkoutWithExercises } from "../types/models";
import { newWorkout, finishWorkout } from "../services/workoutService";
import { createExercise } from "../services/exerciseService";
import { immer } from "zustand/middleware/immer";
import { createSet, updateSet } from "../services/setService";
import { current } from "immer";
import exercises from "../data/exercises";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, "reps" | "weight">
  ) => void;
  deleteSet: (setId: string) => void;
};

export const useWorkouts = create<State & Actions>()(
  immer((set, get) => {
    return {
      currentWorkout: null,
      workouts: [],
      startWorkout: () => {
        set({ currentWorkout: newWorkout() });
      },
      finishWorkout: () => {
        const { currentWorkout } = get();

        if (!currentWorkout) {
          return;
        }

        const finishedWorkout = finishWorkout(currentWorkout);

        set((state) => {
          state.currentWorkout = null;
          //unshift to make the latest workout to apperar first
          state.workouts.unshift(finishedWorkout);
        });
      },
      addExercise: (name) => {
        const { currentWorkout } = get();
        if (!currentWorkout) return;
        const newExercise = createExercise(name, currentWorkout.id);

        set((state) => {
          state.currentWorkout?.exercises.push(newExercise);
        });
      },
      addSet: (exerciseId) => {
        const newSet = createSet(exerciseId);

        set((state) => {
          const exercise = state.currentWorkout?.exercises.find(
            (e) => e.id === exerciseId
          );
          exercise?.sets?.push(newSet);
        });
      },
      updateSet: (setId, updatedFields) => {
        set((state) => {
          if (!state.currentWorkout) return;

          const exercise = state.currentWorkout.exercises.find((exercise) =>
            exercise.sets.some((set) => set.id === setId)
          );

          const setIndex = exercise?.sets.findIndex((set) => set.id === setId);

          if (!exercise || setIndex === undefined || setIndex === -1) {
            return;
          }
          const updatedSet = updateSet(
            current(exercise.sets[setIndex]),
            updatedFields
          );
          exercise.sets[setIndex] = updatedSet;
        });
      },
      deleteSet: (setId) => {
        set((state) => {
          if (!state.currentWorkout) return;
          const exercise = state.currentWorkout.exercises.find((exerice) =>
            exerice.sets.some((set) => set.id === setId)
          );
          if (!exercise) return;
          exercise.sets = exercise.sets.filter((set) => set.id !== setId);
        });
      },
    };
  })
);
