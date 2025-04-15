import { Card, Text, useTheme, Divider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Exercise } from '@/types/exercise';
import { baseStyles } from '@/theme/baseStyle';
import Body, { Slug } from "react-native-body-highlighter";

type Props = {
  exercise: Exercise;
}

export const MuscleIntensity = ({ exercise }: Props) => {
  const theme = useTheme();

  return (
    <Card style={baseStyles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.sectionTitle}>Músculos e Intensidade</Text>
        
        <View style={styles.bodyContainer}>
          <Body
            data={[
              { slug: exercise.target as Slug, intensity: 2 },
              ...exercise.secondaryMuscles.map(muscle => ({
                slug: muscle as Slug,
                intensity: 1
              }))
            ]}
            scale={0.8}
            side="front"
            border={theme.colors.outline}
          />
          <Body
            data={[
              { slug: exercise.target as Slug, intensity: 2 },
              ...exercise.secondaryMuscles.map(muscle => ({
                slug: muscle as Slug,
                intensity: 1
              }))
            ]}
            scale={0.8}
            side="back"
            border={theme.colors.outline}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.intensitySection}>
          <View style={styles.intensityContainer}>
            <Text variant="bodyLarge" style={styles.targetMuscle}>
              {exercise.target}
            </Text>
            <View style={styles.intensityBar}>
              <View style={[styles.intensityFill, { width: '80%', backgroundColor: theme.colors.primary }]} />
            </View>
          </View>
          {exercise.secondaryMuscles.map((muscle, index) => (
            <View key={index} style={styles.intensityContainer}>
              <Text variant="bodyLarge">{muscle}</Text>
              <View style={styles.intensityBar}>
                <View style={[styles.intensityFill, { width: '40%', backgroundColor: theme.colors.primary }]} />
              </View>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 16,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
  divider: {
    marginVertical: 24,
  },
  intensitySection: {
    paddingHorizontal: 8,
  },
  intensityTitle: {
    marginBottom: 12,
  },
  secondaryTitle: {
    marginTop: 24,
  },
  intensityContainer: {
    marginVertical: 8,
  },
  targetMuscle: {
    textTransform: 'capitalize',
    marginVertical: 4,
  },
  intensityBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    borderRadius: 4,
  },
});