import { View } from 'react-native';
import { Text, Card, MD3Colors, List, ProgressBar, Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { baseStyles } from '@/theme/baseStyle';

export const ActivityStats = () => {
  const dailyStepsGoal = 10000;
  const currentSteps = 7652;
  const stepsProgress = currentSteps / dailyStepsGoal;

  return (
    <Card style={[baseStyles.card, styles.statsCard]}>
      <Card.Title title="Atividade" titleVariant="titleLarge" />
      <Card.Content>
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <List.Icon icon="fire" color={MD3Colors.error50} />
            <Text variant="titleLarge" style={styles.statsNumber}>7</Text>
            <Text variant="labelSmall">Dias Seguidos</Text>
          </View>

          <View style={styles.statsItem}>
            <List.Icon icon="dumbbell" color={MD3Colors.tertiary50} />
            <Text variant="titleLarge" style={styles.statsNumber}>12</Text>
            <Text variant="labelSmall">Treinos</Text>
          </View>

          <View style={styles.statsItem}>
            <List.Icon icon="clock-outline" color={MD3Colors.primary50} />
            <Text variant="titleLarge" style={styles.statsNumber}>8h</Text>
            <Text variant="labelSmall">Tempo Total</Text>
          </View>
        </View>

        {/* <View style={styles.divider} /> */}
        <Divider style={styles.divider} />

        <View style={styles.stepsContainer}>
          <View style={styles.stepsHeader}>
            <List.Icon icon="shoe-print" color={MD3Colors.secondary50} style={styles.stepsIcon} />
            <Text variant="titleLarge" style={styles.statsNumber}>
              {currentSteps} passos
            </Text>
          </View>
          <ProgressBar
            indeterminate={false}
            progress={stepsProgress}
            color={MD3Colors.secondary50}
            style={styles.stepsProgress}
          />
          <Text variant="labelSmall" style={styles.stepsLabel}>
            {`${currentSteps} / ${dailyStepsGoal} passos`}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  statsItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statsNumber: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  divider: {
    marginTop: 16,
    marginVertical: 8,
  },
  stepsContainer: {
    paddingHorizontal: 16,
  },
  stepsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepsProgress: {
    height: 8,
    borderRadius: 4,
  },
  stepsLabel: {
    textAlign: 'center',
  },
  stepsIcon: {
    marginHorizontal: 8,
  }
});