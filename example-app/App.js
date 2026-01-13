import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import ReadingStreakGraph from '../src/components/ReadingStreakGraph';

export default function App() {
  // Sample reading history data (80 days of reading pages)
  const sampleReadingHistory = [
    0, 5, 12, 8, 0, 15, 22,
    10, 18, 25, 30, 0, 0, 8,
    15, 20, 28, 35, 12, 18, 22,
    0, 5, 10, 15, 20, 25, 30,
    8, 12, 18, 0, 10, 15, 20,
    25, 30, 15, 18, 22, 0, 5,
    12, 18, 25, 30, 35, 0, 8,
    15, 20, 25, 0, 10, 15, 22,
    28, 32, 0, 5, 12, 18, 25,
    30, 15, 20, 0, 8, 12, 18,
    22, 28, 35, 0, 10, 15, 20,
    25, 30, 12
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ReadingStreakGraph
          history={sampleReadingHistory}
          numRows={4}
          numCols={20}
          squareSize={14}
          gap={3}
          title="Reading Streak (Last 80 Days)"
          darkMode={false}
          onSquarePress={(value, index) => {
            console.log(`Day ${index + 1}: ${value} pages read`);
          }}
          containerStyle={styles.chartContainer}
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  chartContainer: {
    marginBottom: 20,
  },
});
