import { BottomNavigation, useTheme } from 'react-native-paper';
import HomePage from '.';
import ProfilePage from './profile';
import ExercisesPage from './exercises';
import WorkoutsPage from './workouts';
import NutritionPage from './nutrition';
import { useState } from 'react';

export default function TabLayout() {

  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'index', title: 'Dashboard', focusedIcon: 'chart-bar' },
    { key: 'exercises', title: 'Exercícios', focusedIcon: 'dumbbell' },
    { key: 'workouts', title: 'Treinos', focusedIcon: 'weight-lifter' },
    { key: 'nutrition', title: 'Nutrição', focusedIcon: 'silverware-variant' },
    { key: 'profile', title: 'Perfil', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    index: HomePage,
    exercises: ExercisesPage,
    workouts: WorkoutsPage,
    nutrition: NutritionPage,
    profile: ProfilePage,
  });

  return (
    <BottomNavigation
      theme={theme}
      labeled={false}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
