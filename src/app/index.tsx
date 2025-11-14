import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList } from "react-native";
import { View, Text } from "../components/general/Themed";
import CustomButton from "../components/general/CustomButton";
import WorkoutListItem from "../components/workouts/WorkoutListItem";
import workouts from "../data/dummyWorkouts";
import { router } from "expo-router";

import { create } from "zustand";

type State = {
  count: number;
  name: string;
};

type Action = {
  resetCount: () => void;
  increaseCount: () => void;
  setName: (name: string) => void;
};

const useStore = create<State & Action>((set) => {
  return {
    count: 10,
    name: "Anthony",
    resetCount: () => {
      set({ count: 0 });
    },
    increaseCount: () => {
      set((state) => ({ count: state.count + 1 }));
    },
    setName: (name) => {
      set({ name });
    },
  };
});

function Name() {
  const name = useStore((state) => state.name);
  console.log("Name rendered");
  return <Text>{name}</Text>;
}

function CountDisplay() {
  const count = useStore((state) => state.count);

  console.log("Count Display rendered");

  return <Text style={{ fontSize: 24 }}>Count: {count}</Text>;
}

export default function App() {
  const resetCount = useStore((state) => state.resetCount);
  const incrementCount = useStore((state) => state.increaseCount);
  const setName = useStore((state) => state.setName);

  console.log("rendered App..");

  return (
    <View style={{ gap: 8 }}>
      <CountDisplay />
      <Name />
      <CustomButton title="Reset" onPress={() => resetCount()} />
      <CustomButton title="Increment" onPress={() => incrementCount()} />
      <CustomButton title="Edit Name" onPress={() => setName("Abigael")} />
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <CustomButton
  //       title="Start New Workout"
  //       onPress={() => router.push("/workout/current")}
  //     />

  //     <FlatList
  //       data={workouts}
  //       renderItem={({ item }) => <WorkoutListItem workout={item} />}
  //       contentContainerStyle={{ gap: 8 }}
  //       showsVerticalScrollIndicator={false}
  //     />

  //     <StatusBar style="dark" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
