import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Surface,
  Card,
  Text,
  useTheme,
  ProgressBar,
  FAB,
  Portal,
  Searchbar,
  List,
  IconButton,
  Divider,
  SegmentedButtons
} from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { baseStyles } from '@/theme/baseStyle';

const screenWidth = Dimensions.get('window').width;

const NutritionPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('today');

  const nutritionData = {
    calories: { current: 1800, goal: 2400 },
    protein: { current: 140, goal: 180 },
    carbs: { current: 190, goal: 250 },
    fats: { current: 60, goal: 80 }
  };

  const meals = [
    {
      name: 'Breakfast',
      time: '08:00',
      totalCalories: 405,
      foods: [
        { item: 'Oatmeal', calories: 300, protein: 10, carbs: 50, fats: 5 },
        { item: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0 },
      ]
    },
    {
      name: 'Lunch',
      time: '12:30',
      totalCalories: 381,
      foods: [
        { item: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
        { item: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fats: 1.8 },
      ]
    }
  ];

  const pieChartData = [
    {
      name: 'Protein',
      population: nutritionData.protein.current,
      color: theme.colors.primary,
      legendFontColor: theme.colors.onSurface,
    },
    {
      name: 'Carbs',
      population: nutritionData.carbs.current,
      color: theme.colors.secondary,
      legendFontColor: theme.colors.onSurface,
    },
    {
      name: 'Fats',
      population: nutritionData.fats.current,
      color: theme.colors.tertiary,
      legendFontColor: theme.colors.onSurface,
    },
  ];

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>Nutrição</Text>
      <SegmentedButtons
        value={selectedDay}
        onValueChange={setSelectedDay}
        buttons={[
          { value: 'yesterday', label: 'Yesterday' },
          { value: 'today', label: 'Today' },
          { value: 'tomorrow', label: 'Tomorrow' },
        ]}
        style={styles.segmentedButtons}
      />

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleLarge">Daily Summary</Text>
          <View style={styles.caloriesSummary}>
            <Text variant="displaySmall">
              {nutritionData.calories.current} / {nutritionData.calories.goal}
            </Text>
            <Text variant="bodyMedium">calories remaining</Text>
          </View>
          <ProgressBar
            progress={nutritionData.calories.current / nutritionData.calories.goal}
            style={styles.progressBar}
          />

          <View style={styles.macroContainer}>
            {/* <PieChart
                data={pieChartData}
                width={screenWidth - 64}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              /> */}
          </View>

          <Divider style={styles.divider} />

          {/* <View style={styles.macroDetails}>
              {Object.entries(nutritionData).map(([macro, data]) => (
                <View key={macro} style={styles.macroItem}>
                  <Text variant="titleMedium" style={{ textTransform: 'capitalize' }}>{macro}</Text>
                  <Text variant="bodyLarge">{data.current}g / {data.goal}g</Text>
                  <ProgressBar 
                    progress={data.current / data.goal} 
                    style={styles.macroProgress} 
                  />
                </View>
              ))}
            </View> */}
        </Card.Content>
      </Card>

      <Searchbar
        placeholder="Search foods"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        mode="bar"
      />

      {meals.map((meal, index) => (
        <Card key={index} style={styles.mealCard}>
          <Card.Title
            title={meal.name}
            subtitle={`${meal.time} • ${meal.totalCalories} cal`}
            right={(props) => (
              <IconButton {...props} icon="plus" onPress={() => { }} />
            )}
          />
          <Card.Content>
            <List.Section>
              {meal.foods.map((food, foodIndex) => (
                <List.Item
                  key={foodIndex}
                  title={food.item}
                  description={`${food.calories} cal • P: ${food.protein}g • C: ${food.carbs}g • F: ${food.fats}g`}
                  left={props => <List.Icon {...props} icon="food" />}
                />
              ))}
            </List.Section>
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
  segmentedButtons: {
    margin: 16,
  },
  summaryCard: {
    margin: 16,
  },
  caloriesSummary: {
    alignItems: 'center',
    marginVertical: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  macroContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  divider: {
    marginVertical: 16,
  },
  macroDetails: {
    gap: 16,
  },
  macroItem: {
    gap: 8,
  },
  macroProgress: {
    height: 4,
    borderRadius: 2,
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  mealCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NutritionPage;