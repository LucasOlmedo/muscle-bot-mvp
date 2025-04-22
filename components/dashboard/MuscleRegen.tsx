import { View, StyleSheet } from 'react-native';
import { Text, SegmentedButtons, Card } from 'react-native-paper';
import Body from "react-native-body-highlighter";
import { useState } from 'react';
import { baseStyles } from '@/theme/baseStyle';

type MuscleData = {
  slug: string;
  intensity: number;
  lastWorked: Date;
  recoveryTime: number;
};

type ViewRange = 'daily' | 'weekly';

const RECOVERY_THRESHOLDS = {
  RECENT: 33,
  RECOVERING: 66,
  ALMOST_RECOVERED: 100,
} as const;

const MUSCLE_COLORS = {
  RECENT: 'red',
  RECOVERING: 'yellow',
  ALMOST_RECOVERED: 'lime',
} as const;

export const MuscleRegen = () => {
  const [viewRange, setViewRange] = useState<ViewRange>('daily');

  // Add function to calculate intensity based on recovery time
  const calculateIntensity = (lastWorked: Date, recoveryTime: number): number => {
    const hoursSinceWorked = (new Date().getTime() - lastWorked.getTime()) / (1000 * 60 * 60);
    const recoveryPercentage = (hoursSinceWorked / recoveryTime) * 100;

    if (recoveryPercentage < RECOVERY_THRESHOLDS.RECENT) return 3;
    if (recoveryPercentage < RECOVERY_THRESHOLDS.RECOVERING) return 2;
    if (recoveryPercentage < RECOVERY_THRESHOLDS.ALMOST_RECOVERED) return 1;
    return 0;
  };

  // Update muscleData to use calculateIntensity
  const muscleData = {
    daily: {
      front: [
        { slug: "chest", intensity: calculateIntensity(new Date(2024, 3, 16, 10, 0), 48), lastWorked: new Date(2024, 3, 16, 10, 0), recoveryTime: 48 },
        { slug: "biceps", intensity: 2, lastWorked: new Date(2024, 3, 15, 10, 0), recoveryTime: 48 },
        { slug: "quadriceps", intensity: 1, lastWorked: new Date(2024, 3, 14, 10, 0), recoveryTime: 72 },
        { slug: "deltoids", intensity: 0, lastWorked: new Date(2024, 3, 13, 10, 0), recoveryTime: 48 },
      ],
      back: [
        { slug: "upper-back", intensity: 2, lastWorked: new Date(2024, 3, 15, 10, 0), recoveryTime: 48 },
        { slug: "hamstring", intensity: 1, lastWorked: new Date(2024, 3, 14, 10, 0), recoveryTime: 72 },
        { slug: "triceps", intensity: 3, lastWorked: new Date(2024, 3, 16, 10, 0), recoveryTime: 48 },
      ],
    },
    weekly: {
      front: [
        { slug: "chest", intensity: 2, lastWorked: new Date(2024, 3, 15, 10, 0), recoveryTime: 48 },
        { slug: "biceps", intensity: 1, lastWorked: new Date(2024, 3, 14, 10, 0), recoveryTime: 48 },
        { slug: "quadriceps", intensity: 3, lastWorked: new Date(2024, 3, 16, 10, 0), recoveryTime: 72 },
        { slug: "deltoids", intensity: 2, lastWorked: new Date(2024, 3, 15, 10, 0), recoveryTime: 48 },
      ],
      back: [
        { slug: "upper-back", intensity: 1, lastWorked: new Date(2024, 3, 14, 10, 0), recoveryTime: 48 },
        { slug: "hamstring", intensity: 3, lastWorked: new Date(2024, 3, 16, 10, 0), recoveryTime: 72 },
        { slug: "triceps", intensity: 2, lastWorked: new Date(2024, 3, 15, 10, 0), recoveryTime: 48 },
      ],
    },
  };

  const renderLegendItem = (color: string, label: string) => (
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: color }]} />
      <Text variant="labelSmall">{label}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text>Trabalho Muscular</Text>
      </View>
      <Card style={baseStyles.card}>
        <Card.Content>
          <View>
            <SegmentedButtons
              value={viewRange}
              onValueChange={value => value && setViewRange(value as ViewRange)}
              buttons={[
                { value: 'daily', label: 'Hoje', icon: 'calendar-today' },
                { value: 'weekly', label: 'Semana', icon: 'calendar-week' },
              ]}
              style={styles.toggleButtons}
            />
          </View>

          <View style={styles.bodyContainer}>
            {['front', 'back'].map((side) => (
              <Body
                key={side}
                data={muscleData[viewRange][side as keyof typeof muscleData[typeof viewRange]] as unknown as any[]}
                side={side as 'front' | 'back'}
                border={'transparent'}
                colors={[
                  MUSCLE_COLORS.ALMOST_RECOVERED,
                  MUSCLE_COLORS.RECOVERING,
                  MUSCLE_COLORS.RECENT,
                ]}
              />
            ))}
          </View>

          <View>
            {renderLegendItem(MUSCLE_COLORS.RECENT, 'Recém Trabalhado')}
            {renderLegendItem(MUSCLE_COLORS.RECOVERING, 'Em Recuperação')}
            {renderLegendItem(MUSCLE_COLORS.ALMOST_RECOVERED, 'Quase Recuperado')}
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 16,
  },
  toggleButtons: {
    marginLeft: 16,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
});