import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';

export const baseStyles = StyleSheet.create({
  // Layout containers
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },

  // Headings
  pageHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  
  // Cards
  card: {
    margin: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  
  // Lists and Grids
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  // Form Elements
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  segmentedButtons: {
    margin: 16,
    marginBottom: 16,
  },
  
  // Progress Indicators
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  
  // Chips and Tags
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
  
  // Text Styles
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  
  // Dividers
  divider: {
    marginVertical: 16,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

// Theme colors
export const themeColors = {
  primary: MD3Colors.primary60,
  error: MD3Colors.error60,
  tertiary: MD3Colors.tertiary60,
  surface: '#FFFFFF',
  background: '#121212', // Dark theme background
  text: MD3Colors.primary100,
};

// Spacing constants
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Typography
export const typography = {
  headlineLarge: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headlineMedium: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};
