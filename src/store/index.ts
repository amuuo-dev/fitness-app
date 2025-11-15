import { create } from "zustand";
import { WorkoutWithExercises } from "../types/models";
import { newWorkout, finishWorkout } from "../services/workoutService";
import { createExercise } from "../services/exerciseService";
import { immer } from "zustand/middleware/immer";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;
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
      addExercise: (name: string) => {
        const { currentWorkout } = get();
        if (!currentWorkout) return;
        const newExercise = createExercise(name, currentWorkout.id);

        set((state) => {
          state.currentWorkout?.exercises.push(newExercise);
        });
      },
    };
  })
);
