import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ReadingStreakGraph from '../src/components/ReadingStreakGraph';
import HeatmapChart from '../src/components/HeatmapChart';
import ActivityBarChart from '../src/components/ActivityBarChart';
import ProgressCard from '../src/components/ProgressCard';

export default function App() {
  const [selectedChart, setSelectedChart] = useState('reading');
  const [darkMode, setDarkMode] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [squareSize, setSquareSize] = useState(14);
  // Sample reading history data (84 days of reading pages - 12 weeks)
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
    25, 30, 12, 16, 20, 8, 14,
  ];

  // Sample heatmap data (last 84 days)
  const sampleHeatmapDays = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const value = Math.floor(Math.random() * 10);
    sampleHeatmapDays.push({
      date: date,
      dateStr: date.toISOString().split('T')[0],
      intensity: value / 10,
      value: value,
      dayOfWeek: date.getDay(),
      isToday: i === 0,
    });
  }

  // Sample activity bar chart data (last 7 days)
  const sampleBarChartData = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 10 },
    { label: 'Sun', value: 6 },
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'reading':
        return (
          <ReadingStreakGraph
            history={sampleReadingHistory}
            numRows={7}
            numCols={12}
            squareSize={squareSize}
            gap={3}
            title="Daily Reading Progress"
            darkMode={darkMode}
            onSquarePress={(value, index) => {
              console.log(`Day ${index + 1}: ${value} pages read`);
            }}
            containerStyle={styles.chartContainer}
          />
        );
      case 'heatmap':
        return (
          <HeatmapChart
            days={sampleHeatmapDays}
            title="Activity Heatmap"
            showTimeLabels={false}
            showDayLabels={showLabels}
            cellSize={16}
            cellGap={3}
            weeksToShow={12}
            darkMode={darkMode}
            onDayPress={(day) => {
              console.log(`Clicked: ${day.dateStr}, Value: ${day.value}`);
            }}
            containerStyle={styles.chartContainer}
          />
        );
      case 'bar':
        return (
          <ActivityBarChart
            data={sampleBarChartData}
            title="Sessions This Week"
            subtitle="Daily focus sessions"
            valueLabel="Sessions"
            showValues={true}
            showGrid={true}
            animated={animated}
            barWidth={28}
            chartHeight={200}
            darkMode={darkMode}
            onBarPress={(data, index) => {
              console.log(`${data.label}: ${data.value} sessions`);
            }}
            containerStyle={styles.chartContainer}
          />
        );
      case 'cards':
        return (
          <View style={styles.cardsGrid}>
            <View style={styles.cardsRow}>
              <ProgressCard
                icon="book-open-page-variant"
                value="156"
                label="Pages"
                subtitle="This week"
                progress={0.65}
                darkMode={darkMode}
                size="small"
                style={styles.cardSquare}
              />
              <ProgressCard
                icon="fire"
                value="12"
                label="Streak"
                subtitle="Days"
                progress={0.85}
                darkMode={darkMode}
                size="small"
                style={styles.cardSquare}
              />
            </View>
            <View style={styles.cardsRow}>
              <ProgressCard
                icon="timer-outline"
                value="24h"
                label="Study"
                subtitle="This month"
                progress={0.45}
                darkMode={darkMode}
                size="small"
                style={styles.cardSquare}
              />
              <ProgressCard
                icon="chart-line"
                value="89%"
                label="Progress"
                subtitle="Goals"
                progress={0.89}
                darkMode={darkMode}
                size="small"
                style={styles.cardSquare}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={[styles.scrollView, darkMode && styles.scrollViewDark]}>
      <View style={styles.container}>
        <Text style={[styles.mainTitle, darkMode && styles.textDark]}>
          Chart Examples
        </Text>

        {/* Chart Selector */}
        <View style={[styles.pickerContainer, darkMode && styles.pickerContainerDark]}>
          <Text style={[styles.label, darkMode && styles.textDark]}>Select Chart:</Text>
          <Picker
            selectedValue={selectedChart}
            onValueChange={(value) => setSelectedChart(value)}
            style={[styles.picker, darkMode && styles.pickerDark]}
          >
            <Picker.Item label="Reading Streak Graph" value="reading" />
            <Picker.Item label="Activity Heatmap" value="heatmap" />
            <Picker.Item label="Bar Chart" value="bar" />
            <Picker.Item label="Progress Cards" value="cards" />
          </Picker>
        </View>

        {/* Settings */}
        <View style={[styles.settingsContainer, darkMode && styles.settingsContainerDark]}>
          <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Settings</Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, darkMode && styles.textDark]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor={darkMode ? '#A78BFA' : '#F3F4F6'}
            />
          </View>

          {selectedChart === 'heatmap' && (
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, darkMode && styles.textDark]}>Show Day Labels</Text>
              <Switch
                value={showLabels}
                onValueChange={setShowLabels}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor={showLabels ? '#A78BFA' : '#F3F4F6'}
              />
            </View>
          )}

          {selectedChart === 'bar' && (
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, darkMode && styles.textDark]}>Animated</Text>
              <Switch
                value={animated}
                onValueChange={setAnimated}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor={animated ? '#A78BFA' : '#F3F4F6'}
              />
            </View>
          )}

          {selectedChart === 'reading' && (
            <>
              <View style={styles.settingRow}>
                <Text style={[styles.settingLabel, darkMode && styles.textDark]}>Square Size: {squareSize}px</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, darkMode && styles.buttonDark]}
                  onPress={() => setSquareSize(Math.max(10, squareSize - 2))}
                >
                  <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, darkMode && styles.buttonDark]}
                  onPress={() => setSquareSize(Math.min(20, squareSize + 2))}
                >
                  <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>+</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Chart Display */}
        <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Preview</Text>
        {renderChart()}

        <StatusBar style={darkMode ? 'light' : 'dark'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewDark: {
    backgroundColor: '#0A0A0A',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 16,
  },
  textDark: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pickerContainerDark: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  pickerDark: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsContainerDark: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#A78BFA',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDark: {
    color: '#1A1A1A',
  },
  cardsGrid: {
    gap: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },
  cardSquare: {
    flex: 1,
    aspectRatio: 1,
    minWidth: 0,
  },
  chartContainer: {
    marginBottom: 16,
  },
});
