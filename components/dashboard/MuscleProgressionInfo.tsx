import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, List, useTheme, MD3Colors, Divider } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Body from "react-native-body-highlighter";
import { baseStyles } from '@/theme/baseStyle';

const screenWidth = Dimensions.get("window").width;

export const MuscleProgressionInfo = () => {
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
    <>
      <View style={styles.sectionHeader}>
        <Text>Progressão Muscular</Text>
      </View>
      <Card style={baseStyles.card}>
        <Card.Content>
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
          <List.Section>
            <List.Item
              title="Carga"
              left={props => <List.Icon {...props} icon="weight-lifter" color={MD3Colors.primary60} />}
            />
            <List.Item
              title="Fadiga"
              left={props => <List.Icon {...props} icon="lightning-bolt" color={MD3Colors.error60} />}
            />
            <List.Item
              title="Recuperação"
              left={props => <List.Icon {...props} icon="heart-pulse" color={MD3Colors.tertiary60} />}
            />
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
    marginVertical: 8,
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
});
