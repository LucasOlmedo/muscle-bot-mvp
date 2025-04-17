import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import exercises from '@/constants/ExercisesData';
import { ExerciseInstructions } from '@/components/exercise-detail/ExerciseInstructions';
import { MuscleIntensity } from '@/components/exercise-detail/MuscleIntensity';
import { ProgressHistory } from '@/components/exercise-detail/ProgressHistory';
import { Exercise } from '@/types/exercise';

const ExerciseDetail = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [activeView, setActiveView] = useState('details');

  const exercise = exercises.find(ex => ex.id === id) as Exercise;

  const renderContent = () => {
    switch (activeView) {
      case 'details':
        return <ExerciseInstructions exercise={exercise} />;
      case 'muscles':
        return <MuscleIntensity exercise={exercise} />;
      case 'progress':
        return <ProgressHistory exercise={exercise} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>{exercise.name}</Text>

      <View style={styles.segmentedContainer}>
        <SegmentedButtons
          value={activeView}
          onValueChange={setActiveView}
          buttons={[
            { value: 'details', label: 'Detalhes' },
            { value: 'muscles', label: 'Músculos' },
            { value: 'progress', label: 'Progresso' },
          ]}
        />
      </View>

      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  segmentedContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});

export default ExerciseDetail;
