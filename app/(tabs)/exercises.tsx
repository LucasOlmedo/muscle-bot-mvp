import { View, ScrollView, StyleSheet } from 'react-native';
import { useState, useMemo } from 'react';
import { Card, Searchbar, Text, useTheme } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import FilterChips from '@/components/exercises/FilterChips';
import ExerciseItem from '@/components/exercises/ExerciseItem';
import exercises from '@/constants/ExercisesData';

const ExercisesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['All']);

  const categories = useMemo((): string[] =>
    ['All', ...new Set<string>(exercises.map(exercise => exercise.bodyPart))],
    []
  );

  const equipments = useMemo((): string[] =>
    ['All', ...new Set<string>(exercises.map(exercise => exercise.equipment))],
    []
  );

  const handleFilter = (filter: string, type: 'category' | 'equipment') => {
    const setFilter = type === 'category'
      ? setSelectedCategories : setSelectedEquipments;

    const currentSelection = type === 'category'
      ? selectedCategories : selectedEquipments;

    if (filter === 'All') {
      setFilter(['All']);
      return;
    }

    const updatedSelection = currentSelection.includes(filter)
      ? currentSelection.filter(item => item !== filter)
      : [...currentSelection.filter(item => item !== 'All'), filter];

    setFilter(updatedSelection.length ? updatedSelection : ['All']);
  };

  const filteredExercises = useMemo(() => {
    const isDefaultFilter = selectedCategories.includes('All') &&
      selectedEquipments.includes('All') &&
      !searchQuery;

    if (isDefaultFilter) return exercises;

    return exercises.filter(exercise => (
      (selectedCategories.includes('All')
        || selectedCategories.includes(exercise.bodyPart)) &&
      (selectedEquipments.includes('All')
        || selectedEquipments.includes(exercise.equipment)) &&
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [selectedCategories, selectedEquipments, searchQuery]);

  return (
    <ScrollView style={[baseStyles.container,
    { backgroundColor: theme.colors.background }]}
    >
      <Text style={baseStyles.pageHeader}>Exercícios</Text>

      <Searchbar
        placeholder="Search exercises"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        mode="bar"
      />

      <View style={styles.container}>
        <FilterChips
          items={equipments}
          selectedItems={selectedEquipments}
          onSelect={handleFilter}
          type="equipment"
        />

        <FilterChips
          items={categories}
          selectedItems={selectedCategories}
          onSelect={handleFilter}
          type="category"
        />

        <ScrollView style={styles.exerciseList}>
          {filteredExercises.length > 0 && (
            <Card style={styles.exerciseList}>
              <Card.Content>
                {filteredExercises.map(exercise => (
                  <ExerciseItem key={exercise.id} exercise={exercise} />
                ))}
              </Card.Content>
            </Card>
          )}
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
});

export default ExercisesPage;