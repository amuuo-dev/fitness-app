import dayjs from "dayjs";

export const calculateDuration = (startTime: Date, finishTime: Date | null) => {
  if (!finishTime) return "0.00";

  //converts the dates to the minutes in total
  const duration = dayjs(finishTime).diff(dayjs(startTime), "minutes");
  //get the hours from the durtaion
  const hours = Math.floor(duration / 60);
  //get the remaineder from hours to get the minutes
  const minutes = duration % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export const calculateDurationHourMinutes = (start: Date, end: Date | null) => {
  if (!end) return "0:00";

  const totalSeconds = dayjs(end).diff(dayjs(start), "seconds");
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes} mins : ${seconds.toString().padStart(2, "0")} secs`;
};
