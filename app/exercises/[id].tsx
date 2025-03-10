import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, useTheme, List } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import { Exercise } from '@/types/exercise';
import Body, { Slug } from "react-native-body-highlighter";
import { Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import exercises from '@/constants/ExercisesData';

const screenWidth = Dimensions.get("window").width;

const ExerciseDetail = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const exercise = exercises.find(ex => ex.id === id) as Exercise;

  // Mock data for exercise history
  const progressData = {
    labels: ['1/1', '8/1', '15/1', '22/1', '29/1', '5/2'],
    datasets: [{
      data: [30, 35, 35, 40, 40, 45],
      color: () => theme.colors.primary,
      strokeWidth: 2,
    }],
  };

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>{exercise.name}</Text>

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
              left={props =>
                <List.Icon {...props} icon={"numeric-" + (index + 1) + "-circle-outline"} />}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={baseStyles.card}>
        <Card.Title title="Músculos Trabalhados" titleVariant="titleLarge" />
        <Card.Content style={styles.bodyContainer}>
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
        </Card.Content>
      </Card>

      <Card style={baseStyles.card}>
        <Card.Title title="Histórico de Progressão" titleVariant="titleLarge" />
        <Card.Content>
          <LineChart
            data={progressData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: theme.colors.elevation.level2,
              backgroundGradientTo: theme.colors.elevation.level2,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.colors.onSurface + opacity * 100,
              labelColor: () => theme.colors.onSurface,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={styles.chart}
          />
          <Text style={styles.chartLabel}>Carga (kg) por Sessão</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  exerciseImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  chartLabel: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  }
});

export default ExerciseDetail;
