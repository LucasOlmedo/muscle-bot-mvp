import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Searchbar, Text, useTheme, IconButton, ActivityIndicator } from 'react-native-paper';
import { generateMockList, getPaginatedData } from '@/utils/mockData';
import { baseStyles } from '@/theme/baseStyle';
import FilterChips from '@/components/exercises/FilterChips';
import ExerciseItem from '@/components/exercises/ExerciseItem';
import exercises from '@/constants/ExercisesData';

const ITEMS_PER_PAGE = 10;
const fullMockList = generateMockList();

const ExercisesPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['All']);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [displayedExercises, setDisplayedExercises] = useState(
    getPaginatedData(fullMockList, 0, ITEMS_PER_PAGE)
  );

  const categories = useMemo((): string[] =>
    ['All', ...new Set<string>(exercises.map(exercise => exercise.bodyPart))],
    []
  );

  const equipments = useMemo((): string[] =>
    ['All', ...new Set<string>(exercises.map(exercise => exercise.equipment))],
    []
  );

  const filteredFullList = useMemo(() => {
    const isDefaultFilter = selectedCategories.includes('All') &&
      selectedEquipments.includes('All') &&
      !searchQuery;

    if (isDefaultFilter) return fullMockList;

    return fullMockList.filter(exercise => (
      (selectedCategories.includes('All') || selectedCategories.includes(exercise.bodyPart)) &&
      (selectedEquipments.includes('All') || selectedEquipments.includes(exercise.equipment)) &&
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [selectedCategories, selectedEquipments, searchQuery]);

  const hasActiveFilters = () => {
    return !selectedCategories.includes('All') || !selectedEquipments.includes('All');
  };

  const getFilterIcon = () => {
    if (isFiltersVisible) return 'filter-remove';
    if (hasActiveFilters()) return 'filter-check';
    return 'filter';
  };

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

  const resetList = useCallback(() => {
    setPage(0);
    setDisplayedExercises(getPaginatedData(filteredFullList, 0, ITEMS_PER_PAGE));
  }, [filteredFullList]);

  const loadMoreExercises = async () => {
    if (loading) return;

    const nextPageData = getPaginatedData(filteredFullList, page + 1, ITEMS_PER_PAGE);
    if (nextPageData.length === 0) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setDisplayedExercises(prev => [...prev, ...nextPageData]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    resetList();
    setRefreshing(false);
  }, [resetList]);

  useEffect(() => {
    resetList();
  }, [selectedCategories, selectedEquipments, searchQuery, resetList]);

  const handleScroll = ({ nativeEvent }:
    { nativeEvent: { layoutMeasurement: { height: number }, contentOffset: { y: number }, contentSize: { height: number } } }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 50; // Increase trigger area for mobile

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isCloseToBottom && !loading) {
      loadMoreExercises();
    }
  };

  return (
    <ScrollView
      style={[baseStyles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Increase scroll event frequency
      onMomentumScrollEnd={handleScroll} // Add momentum scroll handling
    >
      <Text style={baseStyles.pageHeader}>Exercícios</Text>

      <Searchbar
        placeholder="Search exercises"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        mode="bar"
        right={() => (
          <IconButton
            mode='contained-tonal'
            icon={getFilterIcon()}
            onPress={() => setIsFiltersVisible(!isFiltersVisible)}
          />
        )}
      />

      <View style={styles.container}>
        {isFiltersVisible && (
          <View style={styles.filtersContainer}>
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
          </View>
        )}

        <View style={styles.exerciseList}>
          {displayedExercises.length > 0 ? (
            <Card style={styles.exerciseList}>
              <Card.Content>
                {displayedExercises.map(exercise => (
                  <ExerciseItem key={exercise.key} exercise={exercise} />
                ))}
                {loading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" />
                  </View>
                )}
              </Card.Content>
            </Card>
          ) : (
            <Text style={styles.noResults}>No exercises found</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  exerciseList: {
    flex: 1,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    padding: 16,
    opacity: 0.7,
  },
});

export default ExercisesPage;
