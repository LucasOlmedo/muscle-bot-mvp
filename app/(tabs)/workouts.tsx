import { baseStyles } from '@/theme/baseStyle';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Surface,
  Card,
  Text,
  useTheme,
  FAB,
  Portal,
  Searchbar,
  Chip,
  List,
  IconButton,
  ProgressBar,
  Divider
} from 'react-native-paper';

const WorkoutsPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const savedWorkouts = [
    {
      id: '1',
      name: 'Upper Body Strength',
      duration: 45,
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      exercises: 8,
      progress: 0.75,
      lastPerformed: '2 days ago',
      difficulty: 'Intermediate'
    },
    {
      id: '2',
      name: 'Leg Day',
      duration: 60,
      targetMuscles: ['Quads', 'Hamstrings', 'Calves'],
      exercises: 6,
      progress: 1,
      lastPerformed: 'Yesterday',
      difficulty: 'Advanced'
    },
    {
      id: '3',
      name: 'Core Workout',
      duration: 30,
      targetMuscles: ['Abs', 'Obliques', 'Lower Back'],
      exercises: 5,
      progress: 0.3,
      lastPerformed: '1 week ago',
      difficulty: 'Beginner'
    },
  ];

  const filters = ['All', 'In Progress', 'Completed', 'Not Started'];
  const totalTime = savedWorkouts.reduce((acc, workout) => acc + workout.duration, 0);
  const totalWorkouts = savedWorkouts.length;

  const filteredWorkouts = savedWorkouts.filter(workout =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={baseStyles.pageHeader}>Meus Treinos</Text>
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="titleMedium">Total Workouts</Text>
              <Text variant="displaySmall">{totalWorkouts}</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="titleMedium">Total Time</Text>
              <Text variant="displaySmall">{totalTime}m</Text>
            </Card.Content>
          </Card>
        </View>

        <Searchbar
          placeholder="Search workouts"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={baseStyles.searchbar}
          mode="bar"
        />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map(filter => (
            <Chip
              key={filter}
              selected={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
              style={styles.filterChip}
              showSelectedOverlay
            >
              {filter}
            </Chip>
          ))}
        </ScrollView>

        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} style={styles.workoutCard}>
            <Card.Title
              title={workout.name}
              subtitle={`${workout.duration} mins • ${workout.difficulty}`}
              right={(props) => (
                <IconButton {...props} icon="play-circle" onPress={() => {}} />
              )}
            />
            <Card.Content>
              <ProgressBar 
                progress={workout.progress} 
                style={styles.progressBar}
                theme={{ colors: { primary: theme.colors.primary }}}
              />
              <Text variant="bodySmall" style={styles.lastPerformed}>
                Last performed: {workout.lastPerformed}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statsCard: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  workoutCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressBar: {
    marginVertical: 8,
    height: 8,
    borderRadius: 4,
  },
  lastPerformed: {
    marginBottom: 8,
    paddingBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  musclesTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  muscleChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleChip: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default WorkoutsPage;