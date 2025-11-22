import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
export const dbName = "WorkoutTracker.db";

export const getDB = async () => {
  //if the db is opened dont open again
  if (db) return db;
  db = await SQLite.openDatabaseAsync(dbName);

  return db;
};
