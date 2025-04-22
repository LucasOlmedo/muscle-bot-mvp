import { ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import { ActivityStats } from '@/components/dashboard/ActivityStats';
import { ScheduleWorkout } from '@/components/dashboard/ScheduleWorkout';
import { MuscleProgressionInfo } from '@/components/dashboard/MuscleProgressionInfo';
import { MuscleRegen } from '@/components/dashboard/MuscleRegen';

const HomePage = () => {
  const theme = useTheme();

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>Dashboard</Text>

      <ActivityStats />
      <MuscleProgressionInfo />
      <MuscleRegen />
      <ScheduleWorkout />
    </ScrollView>
  );
}

export default HomePage;
