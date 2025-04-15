import { Card, List } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';
import { Exercise } from '@/types/exercise';
import { baseStyles } from '@/theme/baseStyle';

type Props = {
  exercise: Exercise;
}

export const ExerciseInstructions = ({ exercise }: Props) => {
  return (
    <Card style={baseStyles.card}>
      <Card.Content>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={styles.exerciseImage}
          resizeMode="cover"
          fadeDuration={0}
        />
        {exercise.instructions.map((instruction, index) => (
          <List.Item
            key={index}
            title={instruction}
            titleNumberOfLines={0}
            titleStyle={styles.instructionText}
            style={styles.listItem}
            // left={props =>
            //   <List.Icon {...props} icon={`numeric-${index + 1}-circle-outline`} />}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  exerciseImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  instructionText: {
    flexWrap: 'wrap',
  },
  listItem: {
    paddingRight: -16,
  },
});