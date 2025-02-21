import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

const exercises = [
  { id: 1, name: 'Push-ups', category: 'Upper Body' },
  { id: 2, name: 'Squats', category: 'Lower Body' },
  { id: 3, name: 'Planks', category: 'Core' },
  { id: 4, name: 'Pull-ups', category: 'Upper Body' },
  { id: 5, name: 'Lunges', category: 'Lower Body' },
];

const ExercisesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExercises = selectedCategory === 'All'
    ? exercises
    : exercises.filter(exercise => exercise.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <View style={styles.categoryFilter}>
        {['All', 'Upper Body', 'Lower Body', 'Core'].map(category => (
          <Text
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            {category}
          </Text>
        ))}
      </View>

      <ScrollView style={styles.exerciseList}>
        {filteredExercises.map(exercise => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseCategory}>{exercise.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryFilter: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
    color: 'white',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '500',
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ExercisesPage;