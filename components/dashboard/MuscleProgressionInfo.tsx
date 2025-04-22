import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, List, useTheme, MD3Colors, Divider, SegmentedButtons, Tooltip, IconButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Body from "react-native-body-highlighter";
import { baseStyles } from '@/theme/baseStyle';
import { useState } from 'react';

const screenWidth = Dimensions.get("window").width;

export const MuscleProgressionInfo = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for different time ranges
  const chartData = {
    '7d': {
      labels: ['10/04', '11/04', '12/04', '13/04', '14/04', '15/04', '16/04'],
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
    },
    '30d': {
      labels: ['Mar 15', 'Mar 22', 'Mar 29', 'Apr 05', 'Apr 12'],
      datasets: [
        {
          data: [60, 68, 72, 75, 78],
          color: () => MD3Colors.primary60,
          strokeWidth: 2,
        },
        {
          data: [35, 40, 45, 35, 30],
          color: () => MD3Colors.error60,
          strokeWidth: 2,
        },
        {
          data: [85, 88, 82, 85, 88],
          color: () => MD3Colors.tertiary60,
          strokeWidth: 2,
        },
      ],
    },
    '90d': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          data: [55, 65, 70, 78],
          color: () => MD3Colors.primary60,
          strokeWidth: 2,
        },
        {
          data: [40, 35, 30, 30],
          color: () => MD3Colors.error60,
          strokeWidth: 2,
        },
        {
          data: [80, 85, 88, 88],
          color: () => MD3Colors.tertiary60,
          strokeWidth: 2,
        },
      ],
    },
    'total': {
      labels: ['2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2'],
      datasets: [
        {
          data: [50, 60, 70, 78],
          color: () => MD3Colors.primary60,
          strokeWidth: 2,
        },
        {
          data: [45, 40, 35, 30],
          color: () => MD3Colors.error60,
          strokeWidth: 2,
        },
        {
          data: [75, 80, 85, 88],
          color: () => MD3Colors.tertiary60,
          strokeWidth: 2,
        },
      ],
    },
  };

  const getMetricsAverages = () => {
    const currentData = chartData[timeRange as keyof typeof chartData].datasets;
    return {
      load: Math.round(currentData[0].data.reduce((a, b) => a + b) / currentData[0].data.length),
      fatigue: Math.round(currentData[1].data.reduce((a, b) => a + b) / currentData[1].data.length),
      recovery: Math.round(currentData[2].data.reduce((a, b) => a + b) / currentData[2].data.length),
    };
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text>Progressão Muscular</Text>
      </View>
      <Card style={baseStyles.card}>
        <Card.Content>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { 
                value: '7d',
                label: 'Semanal',
                style: styles.segmentButton,
                labelStyle: styles.segmentButtonLabel,
              },
              { 
                value: '30d',
                label: 'Mensal',
                style: styles.segmentButton,
                labelStyle: styles.segmentButtonLabel,
              },
              { 
                value: '90d',
                label: 'Trimestral',
                style: styles.segmentButton,
                labelStyle: styles.segmentButtonLabel,
              },
              { 
                value: 'total',
                label: 'Total',
                style: styles.segmentButton,
                labelStyle: styles.segmentButtonLabel,
              },
            ]}
            style={styles.segmentedButtons}
          />

          <LineChart
            data={chartData[timeRange as keyof typeof chartData]}
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
              propsForDots: {
                r: '6',
                strokeWidth: '2',
              },
            }}
            bezier
            style={styles.chart}
            withDots
            withInnerLines
            withOuterLines
            withVerticalLines
            withHorizontalLines
            yAxisSuffix="kg"
            yAxisInterval={1}
          />

          <List.Section>
            <View style={styles.metricsContainer}>
              <View style={styles.metricItem}>
                <Tooltip title="Peso máximo levantado nos exercícios">
                  <IconButton
                    icon="weight-lifter"
                    iconColor={MD3Colors.primary60}
                    size={24}
                  />
                </Tooltip>
                <View style={styles.metricContent}>
                  <Text variant="labelMedium">Carga Máxima</Text>
                  <Text variant="titleMedium">{getMetricsAverages().load}kg</Text>
                </View>
              </View>

              <View style={styles.metricItem}>
                <Tooltip title="Percepção de esforço durante treinos">
                  <IconButton
                    icon="lightning-bolt"
                    iconColor={MD3Colors.error60}
                    size={24}
                  />
                </Tooltip>
                <View style={styles.metricContent}>
                  <Text variant="labelMedium">Nível de Fadiga</Text>
                  <Text variant="titleMedium">{getMetricsAverages().fatigue}%</Text>
                </View>
              </View>

              <View style={styles.metricItem}>
                <Tooltip title="Tempo de recuperação entre séries">
                  <IconButton
                    icon="heart-pulse"
                    iconColor={MD3Colors.tertiary60}
                    size={24}
                  />
                </Tooltip>
                <View style={styles.metricContent}>
                  <Text variant="labelMedium">Recuperação</Text>
                  <Text variant="titleMedium">{getMetricsAverages().recovery}%</Text>
                </View>
              </View>
            </View>
          </List.Section>

          <Divider bold={true} style={styles.divider} />

          <View style={styles.bodyContainer}>
            <Body
              data={[
                { slug: "chest", intensity: 1 },
                { slug: "biceps", intensity: 2 },
                { slug: "quadriceps", intensity: 1 },
                { slug: "deltoids", intensity: 2 },
              ]}
              side="front"
              border={theme.colors.outline}
            />
            <Body
              data={[
                { slug: "upper-back", intensity: 2 },
                { slug: "hamstring", intensity: 1 },
                { slug: "triceps", intensity: 1 },
              ]}
              side="back"
              border={theme.colors.outline}
            />
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    marginVertical: 16,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    marginTop: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    padding: 16,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    minWidth: 0,
  },
  segmentButtonLabel: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricContent: {
    alignItems: 'center',
  },
});
