import Card from "../general/Card";
import { getBestSet } from "../../services/setService";
import dayjs from "dayjs";
import { Text, View } from "../general/Themed";
import { WorkoutWithExercises } from "../../types/models";
import { StyleSheet } from "react-native";
import { calculateDuration } from "../../utilis/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

const WorkoutListItem = ({ workout }: WorkoutListItemProps) => {
  return (
    <Card
      title={dayjs(workout.createdAt).format("HH:mm dddd, D MMM")}
      style={{ gap: 8 }}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Exercise</Text>
        <Text style={styles.label}>Best Set</Text>
      </View>

      {workout.exercises.map((exercise) => {
        const bestSet = getBestSet(exercise.sets);
        return (
          <View key={exercise.id} style={styles.row}>
            <Text style={{ color: "gray" }}>
              {exercise.sets.length} x {exercise.name}
            </Text>
            {bestSet && (
              <Text style={{ color: "gray" }}>
                {bestSet.reps}{" "}
                {bestSet.weight ? `x ${bestSet.weight} kg` : "reps"}
              </Text>
            )}
          </View>
        );
      })}

      <View style={styles.footer}>
        <Text>
          <FontAwesome5 name="clock" size={16} color="gray" />{" "}
          {calculateDuration(workout.createdAt, workout.finishedAt)}
        </Text>
        <Text>
          <FontAwesome5 name="weight-hanging" size={16} color="gray" />{" "}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#333",
  },
});

export default WorkoutListItem;
