import { View, StyleSheet } from 'react-native';
import { Card, Icon, MD3Colors, MD3DarkTheme, List, Text, Divider } from 'react-native-paper';
import { baseStyles } from '@/theme/baseStyle';
import CalendarStrip from 'react-native-calendar-strip';
import moment, { Moment } from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';

export const ScheduleWorkout = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  // Mock data for workout days with details
  const workoutDays = [
    {
      date: moment().subtract(2, 'days'),
      workouts: [
        { name: 'Peito e Tríceps', duration: '50 min', intensity: 'Alta' },
        { name: 'Cardio', duration: '30 min', intensity: 'Moderada' }
      ],
      finished: true,
    },
    {
      date: moment(),
      workouts: [
        { name: 'Pernas', duration: '60 min', intensity: 'Alta' }
      ],
      finished: true,
    },
    {
      date: moment().add(1, 'days'),
      workouts: [
        { name: 'Ombros', duration: '40 min', intensity: 'Moderada' }
      ],
      finished: false,
    },
  ];

  const markedDates = workoutDays.map(day => ({
    date: day.date,
    dots: [{
      color: day.finished ? 'lime' : 'red',
    }],
  }));

  const getWorkoutsForDate = (date: Moment) => {
    return workoutDays.find(day => day.date.isSame(date, 'day'))?.workouts || [];
  };

  const renderWorkoutDetails = () => {
    const workouts = getWorkoutsForDate(selectedDate);

    if (workouts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Nenhum treino registrado neste dia
          </Text>
        </View>
      );
    }

    return workouts.map((workout, index) => (
      <List.Item
        key={index}
        title={workout.name}
        description={`${workout.duration} • Intensidade ${workout.intensity}`}
        left={props =>
          <List.Icon {...props} icon="dumbbell" color={MD3Colors.primary50} />
        }
        style={styles.workoutItem}
      />
    ));
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text>Histórico Recente</Text>
      </View>
      <Card style={baseStyles.card}>
        <Card.Content>

          <CalendarStrip
            scrollable={true}
            scrollerPaging={true}
            style={styles.calendar}
            calendarColor={'transparent'}
            calendarHeaderFormat={'DD [de] MMMM[,] YYYY'}
            calendarHeaderStyle={{ color: MD3Colors.neutral60, fontSize: 14 }}
            dateNumberStyle={{ color: MD3Colors.neutral60, fontSize: 14 }}
            dateNameStyle={{ color: MD3Colors.neutral60, fontSize: 10 }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={selectedDate}
            startingDate={moment().subtract(3, 'days')}
            markedDates={markedDates}
            highlightDateNumberStyle={{ color: MD3DarkTheme.colors.primary, fontSize: 14 }}
            highlightDateNameStyle={{ color: MD3DarkTheme.colors.primary, fontSize: 10 }}
            leftSelector={<Icon source="chevron-left" size={24} color={MD3Colors.neutral60} />}
            rightSelector={<Icon source="chevron-right" size={24} color={MD3Colors.neutral60} />}
            onDateSelected={setSelectedDate}
            customDatesStyles={() => ({
              dateContainerStyle: {},
              dateNameStyle: {},
              dateNumberStyle: {},
              highlightDateNameStyle: {},
              highlightDateNumberStyle: {},
              dateHeaderStyle: { color: MD3Colors.neutral60 }
            })}
            headerText={selectedDate.format('DD [de] MMMM[,] YYYY')}
          />

          <View style={styles.detailsContainer}>
            <Divider bold={true} style={styles.divider} />
            {renderWorkoutDetails()}
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 100,
    paddingTop: 8,
  },
  detailsContainer: {
    marginTop: 0,
  },
  dateHeader: {
    marginBottom: 8,
    opacity: 0.7,
  },
  workoutItem: {
    paddingVertical: 4,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  sectionHeader: {
    padding: 16,
  },
  emptyText: {
    opacity: 0.6,
  },
  divider: {
    marginTop: 16,
    marginVertical: 8,
  },
});
