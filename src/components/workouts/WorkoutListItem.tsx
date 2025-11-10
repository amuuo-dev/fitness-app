import Card from "../general/Card";
import { getBestSet } from "../../services/setService";
import dayjs from "dayjs";
import { Text, View } from "../general/Themed";
import { WorkoutWithExercises } from "../../types/models";

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

const WorkoutListItem = ({ workout }: WorkoutListItemProps) => {
  return (
    <Card title={"yooh"}>
      <View>
        <Text>{workout.id}</Text>
      </View>
    </Card>
  );
};

export default WorkoutListItem;
