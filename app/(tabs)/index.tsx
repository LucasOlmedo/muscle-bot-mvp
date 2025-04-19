import { ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, Card, useTheme, MD3Colors, List } from 'react-native-paper';
import Body from "react-native-body-highlighter";
import { baseStyles } from '@/theme/baseStyle';
import { ActivityStats } from '@/components/dashboard/ActivityStats';
import { ScheduleWorkout } from '@/components/dashboard/ScheduleWorkout';
import { MuscleProgressionInfo } from '@/components/dashboard/MuscleProgressionInfo';

const screenWidth = Dimensions.get("window").width;

const HomePage = () => {
  const theme = useTheme();

  const progressData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [65, 70, 68, 72, 75, 70, 70],
        color: () => MD3Colors.primary60,
        strokeWidth: 2,
      },
      {
        data: [30, 45, 35, 50, 40, 30, 30],
        color: () => MD3Colors.error60,
        strokeWidth: 2,
      },
      {
        data: [90, 85, 88, 82, 85, 80, 80],
        color: () => MD3Colors.tertiary60,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={baseStyles.pageHeader}>Dashboard</Text>
      
      <ActivityStats />
      <MuscleProgressionInfo />
      <ScheduleWorkout />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  chartSurface: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  statsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  statsItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statsNumber: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default HomePage;
