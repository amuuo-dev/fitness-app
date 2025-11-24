import { getDB } from ".";
import { Workout } from "../types/models";

export const saveWorkout = async (workout: Workout) => {
  try {
    const db = await getDB();
    const result = await db.runAsync(
      "INSERT OR REPLACE INTO workouts(id, created_at, finished_at) VALUES(?,?,?)",
      [
        workout.id,
        workout.createdAt.toISOString(),
        workout.finishedAt?.toISOString() || null,
      ]
    );
    console.log("data saved", result);
  } catch (error) {
    console.error(error);
  }
};
