import { Text, Card } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';

export const ScheduleWorkout = () => {
  return (
    <Card style={baseStyles.card}>
      <Card.Title title="Agenda de Treinos" titleVariant="titleLarge" />
      <Card.Content>
        <Text variant="bodyLarge">Nenhum treino agendado para hoje</Text>
      </Card.Content>
    </Card>
  );
};