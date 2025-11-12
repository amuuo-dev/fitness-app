import { View, Text } from "../general/Themed";
import { ExerciseWithSets } from "../../types/models";
import { getBestSet } from "../../services/setService";
import { StyleSheet } from "react-native";
import Card from "../general/Card";
import Colors from "../../constants/Colors";

type WorkoutExerciseItemProps = {
  exercise: ExerciseWithSets;
};

const WorkoutExerciseItem = ({ exercise }: WorkoutExerciseItemProps) => {
  const bestSet = getBestSet(exercise.sets);
  return (
    <Card title={exercise.name}>
      {exercise.sets.map((exerciseSet, index) => (
        <View
          key={exerciseSet.id}
          style={[
            styles.row,
            {
              backgroundColor:
                exerciseSet.id === bestSet?.id
                  ? Colors.dark.tint + "50"
                  : "transparent",
            },
          ]}
        >
          <Text style={styles.index}>{index + 1}</Text>
          <Text style={styles.info}>
            {exerciseSet.reps}{" "}
            {exerciseSet.weight ? `x ${exerciseSet.weight} kg` : "reps"}
          </Text>
          {exerciseSet.oneRM && (
            <Text style={styles.oneRM}>{Math.floor(exerciseSet.oneRM)} kg</Text>
          )}
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 15,
    padding: 8,
  },
  index: {
    fontSize: 16,
    color: "gray",
  },
  info: {
    fontSize: 16,
  },
  oneRM: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "bold",
  },
});

export default WorkoutExerciseItem;
