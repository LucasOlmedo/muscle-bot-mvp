import { View, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Card, Chip, Divider, List, Searchbar, Text, useTheme } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import { Image } from 'react-native';

const exercises = [
  { id: 1, name: 'Push-ups', category: 'Upper Body' },
  { id: 2, name: 'Squats', category: 'Lower Body' },
  { id: 3, name: 'Planks', category: 'Core' },
  { id: 4, name: 'Pull-ups', category: 'Upper Body' },
  { id: 5, name: 'Lunges', category: 'Lower Body' },
];

const ExercisesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredExercises = selectedCategory === 'All'
    ? exercises
    : exercises.filter(exercise => exercise.category === selectedCategory);

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>Exercícios</Text>
      <Searchbar
        placeholder="Search workouts"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        mode="bar"
      />
      <View style={styles.container}>
        <View style={styles.categoryFilter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={baseStyles.chipGroup}
          >
            {['All', 'Upper Body', 'Lower Body', 'Core'].map(category => (
              <Chip
                key={category}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
                style={baseStyles.chip}
                showSelectedOverlay
              >
                {category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.exerciseList}>
          <Card style={styles.exerciseList}>
            <Card.Content>
              {filteredExercises.map(exercise => (
                <List.Item
                  key={exercise.id}
                  title={exercise.name}
                  description={exercise.category}
                  onPress={() => { }}
                  left={() => (
                    <Image
                      source={{ uri: "https://gymvisual.com/img/p/5/9/3/5/5935.gif" }}
                      style={styles.exerciseImage}
                    />
                  )}
                  titleStyle={styles.exerciseName}
                  descriptionStyle={styles.exerciseCategory}
                />
              ))}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  selectedCategory: {
    color: 'white',
  },
  exerciseList: {
    flex: 1,
  },
  searchbar: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseCategory: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.5,
  },
});

export default ExercisesPage;