import { View } from 'react-native';
import { Text, Card, MD3Colors, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { baseStyles } from '@/theme/baseStyle';

export const ActivityStats = () => {
  return (
    <Card style={[baseStyles.card, styles.statsCard]}>
      <Card.Title title="Atividade" titleVariant="titleLarge" />
      <Card.Content style={styles.statsContainer}>
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