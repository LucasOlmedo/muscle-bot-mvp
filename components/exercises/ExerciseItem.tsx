import { Exercise } from "@/types/exercise";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Chip, List } from "react-native-paper";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => (
  <List.Item
    key={exercise.id}
    title={exercise.name}
    description={() => (
      <Chip
        mode="flat"
        compact={true}
        textStyle={{ fontSize: 12 }}
        style={{ alignSelf: "flex-start", marginTop: 6, borderRadius: 50 }}>
        {exercise.bodyPart}
      </Chip>
    )}
    onPress={() => router.push(`/exercises/${exercise.id}`)}
    left={() => (
      <Image
        source={{ uri: exercise.gifUrl }}
        style={styles.exerciseImage}
        resizeMode="cover"
        fadeDuration={0}
      />
    )}
    titleNumberOfLines={0}
    titleStyle={[styles.exerciseName, styles.titleWrap]}
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
  titleWrap: {
    flexWrap: 'wrap',
    flexShrink: 1,
    paddingRight: 8,
  },
});

export default ExerciseItem;