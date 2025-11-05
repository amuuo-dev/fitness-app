export type Workout = {
  id: string;
  createdAt: Date;
  finishedAt: Date | null;
};

export type Exercise = {
  id: string;
  workoutId: string;
  name: string;
};

export type ExerciseSet = {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number;
  oneRM?: number;
};

export type ExerciseWithSets = Exercise & {
  sets: ExerciseSet[];
};

export type WorkoutWithExercises = Workout & {
  exercises: ExerciseWithSets[];
};
