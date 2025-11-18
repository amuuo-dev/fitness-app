import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { ExerciseSet } from "../../types/models";
import { View, Text, TextInput } from "../general/Themed";
import CustomButton from "../general/CustomButton";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useWorkouts } from "../../store";

type Set = { id: string; weight?: number; reps?: number };
type Props = { index: number; set: Set };

const SetItem = ({ index, set }: Props) => {
  const [weight, setWeight] = useState(set.weight?.toString() || "");
  const [reps, setReps] = useState(set.reps?.toString() || "");
  const updateSet = useWorkouts((state) => state.updateSet);
  const deleteSet = useWorkouts((state) => state.deleteSet);

  const handleWeightChange = () => {
    updateSet(set.id, { weight: parseFloat(weight) });
  };

  const handleRepsChange = () => {
    updateSet(set.id, { reps: parseInt(reps) });
  };

  const renderRight = () => (
    <CustomButton
      title="Delete"
      type="link"
      color="crimson"
      onPress={() => deleteSet(set.id)}
      style={{ padding: 8 }}
    />
  );

  return (
    <Swipeable renderRightActions={renderRight}>
      <View style={styles.container}>
        <Text style={styles.number}>{index + 1}</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="kg"
          style={styles.input}
          onEndEditing={handleWeightChange}
        />
        <TextInput
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
          placeholder="reps"
          style={styles.input}
          onEndEditing={handleRepsChange}
        />
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  number: {
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: 60,
    padding: 5,
    paddingVertical: 7,
    fontSize: 16,
    textAlign: "center",
  },
});

export default SetItem;
