import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Avatar, 
  Card, 
  Text, 
  List, 
  Button, 
  useTheme,
  Divider,
  IconButton,
  SegmentedButtons,
  ProgressBar,
  Chip
} from 'react-native-paper';

const ProfilePage = () => {
  const theme = useTheme();
  const [selectedMetric, setSelectedMetric] = useState('current');

  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/200',
    metrics: {
      weight: '75kg',
      height: '180cm',
      bmi: '23.1',
      bodyFat: '15%',
      musclePercentage: '45%',
      waterPercentage: '60%'
    },
    goals: [
      { title: 'Lose 5kg by end of quarter', progress: 0.4, category: 'Weight Loss' },
      { title: 'Run 5km under 25 minutes', progress: 0.7, category: 'Cardio' },
      { title: 'Complete 10 pull-ups in a row', progress: 0.3, category: 'Strength' }
    ],
    preferences: {
      targetMuscles: ['Back', 'Chest', 'Arms'],
      trainingDays: ['Monday', 'Wednesday', 'Friday'],
      fitnessLevel: 'Intermediate'
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.headerCard}>
        <Card.Content style={styles.header}>
          <Avatar.Image size={120} source={{ uri: userData.avatar }} />
          <View style={styles.userInfo}>
            <Text variant="headlineMedium">{userData.name}</Text>
            <Text variant="bodyLarge">{userData.email}</Text>
            <Button 
              mode="contained-tonal" 
              style={styles.editButton}
              icon="account-edit"
            >
              Edit Profile
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Body Metrics" 
          right={(props) => (
            <IconButton {...props} icon="chart-line" onPress={() => {}} />
          )}
        />
        <Card.Content>
          <SegmentedButtons
            value={selectedMetric}
            onValueChange={setSelectedMetric}
            buttons={[
              { value: 'current', label: 'Current' },
              { value: 'history', label: 'History' },
              { value: 'goals', label: 'Goals' },
            ]}
            style={styles.segmentedButtons}
          />
          <List.Section>
            <List.Item
              title="Weight"
              description={userData.metrics.weight}
              left={props => <List.Icon {...props} icon="weight" />}
            />
            <Divider />
            <List.Item
              title="Height"
              description={userData.metrics.height}
              left={props => <List.Icon {...props} icon="human-male-height" />}
            />
            <Divider />
            <List.Item
              title="BMI"
              description={userData.metrics.bmi}
              left={props => <List.Icon {...props} icon="calculator" />}
            />
            <Divider />
            <List.Item
              title="Body Composition"
              description={`Fat: ${userData.metrics.bodyFat} | Muscle: ${userData.metrics.musclePercentage}`}
              left={props => <List.Icon {...props} icon="percent" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Goals" 
          right={(props) => (
            <IconButton {...props} icon="plus" onPress={() => {}} />
          )}
        />
        <Card.Content>
          {userData.goals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text variant="bodyLarge">{goal.title}</Text>
                <Chip compact>{goal.category}</Chip>
              </View>
              <ProgressBar 
                progress={goal.progress} 
                style={styles.goalProgress} 
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Training Preferences" />
        <Card.Content>
          <Text variant="titleMedium">Target Muscles</Text>
          <View style={styles.chipGroup}>
            {userData.preferences.targetMuscles.map((muscle, index) => (
              <Chip key={index} style={styles.chip}>{muscle}</Chip>
            ))}
          </View>
          
          <Text variant="titleMedium" style={styles.sectionTitle}>Training Days</Text>
          <View style={styles.chipGroup}>
            {userData.preferences.trainingDays.map((day, index) => (
              <Chip key={index} style={styles.chip}>{day}</Chip>
            ))}
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>Fitness Level</Text>
          <Chip icon="star">{userData.preferences.fitnessLevel}</Chip>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginTop: 16,
  },
  header: {
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  editButton: {
    marginTop: 8,
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  goalItem: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalProgress: {
    height: 8,
    borderRadius: 4,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ProfilePage;