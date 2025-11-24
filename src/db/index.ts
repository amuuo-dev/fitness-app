import * as SQLite from "expo-sqlite";
import { DbWorkout } from "../types/db";
import { Workout } from "../types/models";

let db: SQLite.SQLiteDatabase | null = null;
export const dbName = "WorkoutTracker.db";

const createWorkoutsTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY, 
    created_at TEXT, 
    finished_at TEXT
  );`;

export const getDB = async () => {
  //if the db is opened dont open again
  if (db) return db;
  db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(createWorkoutsTableQuery);

  return db;
};

const parseWorkout = (workout: DbWorkout): Workout => {
  return {
    id: workout.id,
    createdAt: new Date(workout.created_at),
    finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
  };
};

export const getCurrentWorkout = async (): Promise<Workout | null> => {
  try {
    const db = await getDB();
    const workout = await db.getFirstAsync<DbWorkout>(
      "SELECT * FROM workouts WHERE finished_at IS NULL ORDER BY created_at DESC LIMIT 1"
    );
    if (!workout) return null;

    return parseWorkout(workout);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const db = await getDB();
    const allWorkouts = await db.getAllAsync<DbWorkout>(
      "SELECT * FROM workouts WHERE finished_at IS NOT NULL ORDER BY created_at DESC"
    );
    return allWorkouts.map(parseWorkout);
  } catch (error) {
    console.error(error);
    return [];
  }
};
