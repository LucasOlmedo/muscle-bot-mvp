import { ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { baseStyles } from '@/theme/baseStyle';

const FilterChips = ({
  items,
  selectedItems,
  onSelect,
  type
}: {
  items: string[],
  selectedItems: string[],
  onSelect: (item: string, type: 'category' | 'equipment') => void,
  type: 'category' | 'equipment'
}) => (
  <View style={styles.categoryFilter}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={baseStyles.chipGroup}
    >
      {items.map(item => (
        <Chip
          key={item}
          selected={selectedItems.includes(item)}
          onPress={() => onSelect(item, type)}
          style={baseStyles.chip}
          showSelectedOverlay
        >
          {item}
        </Chip>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  categoryFilter: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
});

export default FilterChips;