import { View, ScrollView, StyleSheet } from 'react-native';
import { useState, useMemo } from 'react';
import { Card, Searchbar, Text, useTheme } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import { Exercise } from '@/types/exercise';
import FilterChips from '@/components/exercises/FilterChips';
import ExerciseItem from '@/components/exercises/ExerciseItem';

const exercises: Exercise[] = [
  {
    bodyPart: "waist",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/OQtEmeOqzII9KN",
    id: "0001",
    name: "3/4 sit-up",
    target: "abs",
    secondaryMuscles: [
      "hip flexors",
      "lower back"
    ],
    instructions: [
      "Lie flat on your back with your knees bent and feet flat on the ground.",
      "Place your hands behind your head with your elbows pointing outwards.",
      "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
      "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    bodyPart: "waist",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/n5PoRUvOh7iM0R",
    id: "0002",
    name: "45° side bend",
    target: "abs",
    secondaryMuscles: [
      "obliques"
    ],
    instructions: [
      "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
      "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
      "Pause for a moment at the bottom, then slowly return to the starting position.",
      "Repeat on the other side.",
      "Continue alternating sides for the desired number of repetitions."
    ]
  },
  {
    bodyPart: "waist",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/XhnGyFI1XoGvdk",
    id: "0003",
    name: "air bike",
    target: "abs",
    secondaryMuscles: [
      "hip flexors"
    ],
    instructions: [
      "Lie flat on your back with your hands placed behind your head.",
      "Lift your legs off the ground and bend your knees at a 90-degree angle.",
      "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
      "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
      "Continue alternating sides in a pedaling motion for the desired number of repetitions."
    ]
  },
  {
    bodyPart: "waist",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/FEQR2igjfVBeuK",
    id: "0006",
    name: "alternate heel touchers",
    target: "abs",
    secondaryMuscles: [
      "obliques"
    ],
    instructions: [
      "Lie flat on your back with your knees bent and feet flat on the ground.",
      "Extend your arms straight out to the sides, parallel to the ground.",
      "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
      "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
      "Continue alternating sides for the desired number of repetitions."
    ]
  },
  {
    bodyPart: "back",
    equipment: "cable",
    gifUrl: "https://v2.exercisedb.io/image/6icN20v65O9pgQ",
    id: "0007",
    name: "alternate lateral pulldown",
    target: "lats",
    secondaryMuscles: [
      "biceps",
      "rhomboids"
    ],
    instructions: [
      "Sit on the cable machine with your back straight and feet flat on the ground.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
      "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  }
];

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