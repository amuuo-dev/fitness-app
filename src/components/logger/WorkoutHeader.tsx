import { View, Text } from "../general/Themed";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import { calculateDurationHourMinutes } from "../../utilis/time";
import workout from "../../data/dummyWorkouts";

const WorkoutHeader = () => {
  const [timer, setTimer] = useState("0:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = calculateDurationHourMinutes(
        new Date(workout[0]?.createdAt || ""),
        new Date()
      );
      setTimer(duration);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [workout]);

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Workout tracker</Text>
      <Text style={{ fontSize: 18 }}>
        <FontAwesome5 name="clock" size={18} color="gray" /> {timer}
      </Text>
    </View>
  );
};

export default WorkoutHeader;
