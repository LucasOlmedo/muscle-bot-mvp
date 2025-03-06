import { Exercise } from "@/types/exercise";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { List } from "react-native-paper";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => (
  <List.Item
    key={exercise.id}
    title={exercise.name}
    description={exercise.bodyPart}
    onPress={() => { }}
    left={() => (
      <Image
        source={{ uri: exercise.gifUrl }}
        style={styles.exerciseImage}
        resizeMode="cover"
        fadeDuration={0}
      />
    )}
    titleStyle={styles.exerciseName}
    descriptionStyle={styles.exerciseCategory}
  />
);

const styles = StyleSheet.create({
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  exerciseCategory: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.5,
  },
});

export default ExerciseItem;