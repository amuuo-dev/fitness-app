import { Link } from "expo-router";
import React from "react";
import { View, Text } from "../../components/general/Themed";

const CurrentWorkoutScreen = () => {
  return (
    <View>
      <Text> this is the workout page current</Text>
      <Link href={"/workout/2"}>
        <Text>Yooh this is the id page</Text>
      </Link>
    </View>
  );
};

export default CurrentWorkoutScreen;
