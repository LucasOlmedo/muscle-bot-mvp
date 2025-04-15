import { Card, List, Text, useTheme, Divider } from 'react-native-paper';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Exercise } from '@/types/exercise';
import { baseStyles } from '@/theme/baseStyle';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

type Props = {
  exercise: Exercise;
}

export const ProgressHistory = ({ exercise }: Props) => {
  const theme = useTheme();

  const progressData = {
    labels: ['1/1', '8/1', '15/1', '22/1', '29/1', '5/2'],
    datasets: [{
      data: [30, 35, 35, 40, 40, 45],
      color: () => theme.colors.primary,
      strokeWidth: 2,
    }],
  };

  const recentSessions = [
    { date: '5/2', weight: 45, reps: 12, sets: 3 },
    { date: '29/1', weight: 40, reps: 12, sets: 3 },
    { date: '22/1', weight: 40, reps: 10, sets: 3 },
  ];

  return (
    <Card style={baseStyles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Histórico e Progresso
        </Text>

        <View style={styles.chartSection}>
          <LineChart
            data={progressData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: theme.colors.elevation.level2,
              backgroundGradientTo: theme.colors.elevation.level2,
              decimalPlaces: 0,
              color: (opacity = 1) => theme.colors.onSurface + opacity * 100,
              labelColor: () => theme.colors.onSurface,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={styles.chart}
          />
          <Text style={styles.chartLabel}>Carga (kg) por Sessão</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.sessionsSection}>
          <Text variant="titleMedium" style={styles.sessionsTitle}>
            Sessões Recentes
          </Text>
          {recentSessions.map((session, index) => (
            <List.Item
              key={index}
              title={`${session.date} - ${session.weight}kg`}
              description={`${session.sets} séries x ${session.reps} repetições`}
              left={props => <List.Icon {...props} icon="dumbbell" />}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 16,
  },
  chartSection: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  chartLabel: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 24,
  },
  sessionsSection: {
    paddingHorizontal: 8,
  },
  sessionsTitle: {
    marginBottom: 16,
  },
});