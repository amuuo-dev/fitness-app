import { StyleSheet } from "react-native";
import Card from "../general/Card";
import { View, Text } from "../general/Themed";
import SetItem from "./SetItem";
import CustomButton from "../general/CustomButton";
import { ExerciseWithSets } from "../../types/models";

type WorkoutExerciseItemProps = {
  exercise: ExerciseWithSets;
};

const WorkoutExerciseItem = ({ exercise }: WorkoutExerciseItemProps) => {
  return (
    <Card title={exercise.name}>
      <View style={styles.header}>
        <Text style={styles.setNumber}>Set</Text>
        <Text style={styles.setInfo}>kg</Text>
        <Text style={styles.setInfo}>Reps</Text>
      </View>

      <View style={{ gap: 5 }}>
        {exercise.sets.map((item, index) => (
          <SetItem key={item.id} index={index} set={item} />
        ))}
      </View>
      <CustomButton
        title="+ Add set"
        type="link"
        onPress={() => console.log("add set for", exercise.id)}
        style={{ marginTop: 10, padding: 8 }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 5,
  },
  setNumber: {
    marginRight: "auto",
    fontWeight: "bold",
  },
  setInfo: {
    width: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WorkoutExerciseItem;
