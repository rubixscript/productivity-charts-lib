# React Native Productivity Charts

A beautiful React Native library for productivity charts with glassmorphic design. Perfect for **pomodoro timers, habit trackers, time tracking apps, focus apps**, and any productivity application!

[![npm version](https://img.shields.io/npm/v/@rubixscript/react-native-productivity-charts.svg)](https://www.npmjs.com/package/@rubixscript/react-native-productivity-charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📊 **Multiple Chart Types** - Heatmap, Bar Charts, Progress Cards, Monthly Charts
- 🎨 **Glassmorphic Design** - Beautiful blur effects and modern aesthetic
- 🌈 **Highly Customizable** - Colors, themes, sizes, and more
- 🌙 **Dark Mode Support** - Built-in dark mode with smooth transitions
- 📈 **Powered by Gifted Charts** - Smooth animations and performance
- 🎯 **Activity Heatmap** - GitHub-style contribution heatmap
- 💜 **Pre-built Themes** - Purple, Blue, Green, Coral, Orange themes
- 📱 **React Native & Expo Compatible** - Works seamlessly with both
- 🔧 **TypeScript Support** - Full type definitions included
- ⚡ **Optimized Performance** - Memoized calculations and smooth animations

## 📦 Installation

```bash
npm install @rubixscript/react-native-productivity-charts
# or
yarn add @rubixscript/react-native-productivity-charts
```

### Peer Dependencies

```bash
npm install react-native-gifted-charts react-native-svg react-native-linear-gradient expo-linear-gradient expo-blur @expo/vector-icons react-native-safe-area-context
```

## 🚀 Quick Start

### Heatmap Chart (GitHub-style Activity)

```tsx
import React from 'react';
import { View } from 'react-native';
import { HeatmapChart } from '@rubixscript/react-native-productivity-charts';

const MyApp = () => {
  // Sample data - replace with your actual data
  const days = [
    {
      date: new Date('2025-01-01'),
      dateStr: '2025-01-01',
      intensity: 0.8,
      value: 6,
      dayOfWeek: 1,
      isToday: false,
    },
    // ... more days
  ];

  return (
    <View style={{ padding: 16 }}>
      <HeatmapChart
        days={days}
        darkMode={false}
        title="My Activity"
        onDayPress={(day) => console.log('Pressed day:', day)}
      />
    </View>
  );
};
```

### Activity Bar Chart

```tsx
import React from 'react';
import { View } from 'react-native';
import { ActivityBarChart } from '@rubixscript/react-native-productivity-charts';

const MyApp = () => {
  const weeklyData = [
    { label: '1', value: 5 },
    { label: '2', value: 8 },
    { label: '3', value: 6 },
    { label: '4', value: 10 },
    { label: '5', value: 7 },
    { label: '6', value: 9 },
    { label: '7', value: 4 },
  ];

  return (
    <ActivityBarChart
      data={weeklyData}
      title="Weekly Sessions"
      valueLabel="Sessions"
      darkMode={false}
      chartHeight={200}
    />
  );
};
```

### Progress Card

```tsx
import React from 'react';
import { View } from 'react-native';
import { ProgressCard } from '@rubixscript/react-native-productivity-charts';

const MyApp = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
      <ProgressCard
        icon="fire"
        value={15}
        label="Streak"
        darkMode={false}
      />
      <ProgressCard
        icon="clock-outline"
        value={120}
        label="Minutes"
        progress={0.75}
        darkMode={false}
      />
    </View>
  );
};
```

### Monthly Chart

```tsx
import React from 'react';
import { MonthlyChart } from '@rubixscript/react-native-productivity-charts';

const MyApp = () => {
  const months = [
    { name: 'Jan', year: 2025, index: 0 },
    { name: 'Feb', year: 2025, index: 1 },
    // ... more months
  ];

  const days = [
    // Same format as heatmap days
  ];

  return (
    <MonthlyChart
      months={months}
      days={days}
      title="Monthly Activity"
      valueLabel="Sessions"
      darkMode={false}
    />
  );
};
```

## 🎨 Themes

### Using Pre-built Themes

```tsx
import { HeatmapChart, THEMES } from '@rubixscript/react-native-productivity-charts';

<HeatmapChart
  days={days}
  theme={THEMES.blue_dark}
/>
```

### Available Themes

- `purple_light` / `purple_dark` - Default purple theme
- `blue_light` / `blue_dark` - Blue theme
- `green_light` / `green_dark` - Green theme
- `coral_light` / `coral_dark` - Red/Coral theme
- `orange_light` / `orange_dark` - Orange theme

### Creating Custom Theme

```tsx
import { HeatmapChart, createCustomTheme } from '@rubixscript/react-native-productivity-charts';

const myTheme = createCustomTheme('#FF6347', false);

// Or define your own theme
const customTheme = {
  primaryColor: '#FF6347',
  secondaryColor: '#FF8C69',
  accentColor: '#DC3545',
  backgroundColor: '#FFFFFF',
  cardBackgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  secondaryTextColor: '#666666',
  labelColor: '#888888',
  borderColor: 'rgba(255, 99, 71, 0.15)',
  shadowColor: '#FF6347',
  intensityColors: ['#FFE4E1', '#FFC0CB', '#FF8C69', '#FF6347', '#DC3545'],
  darkMode: false,
};

<HeatmapChart days={days} theme={customTheme} />
```

## 📚 API Reference

### HeatmapChart Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `days` | `HeatmapDay[]` | ✅ | - | Array of day data for heatmap |
| `months` | `HeatmapMonth[]` | ❌ | Auto-generated | Month labels for display |
| `dayNames` | `string[]` | ❌ | `['Sun', 'Mon', ...]` | Day labels |
| `title` | `string` | ❌ | `'Activity Heatmap'` | Chart title |
| `showTimeLabels` | `boolean` | ❌ | `true` | Show time labels |
| `timeLabels` | `string[]` | ❌ | `['6 AM', '9 AM', ...]` | Time labels |
| `showDayLabels` | `boolean` | ❌ | `true` | Show day labels |
| `cellSize` | `number` | ❌ | `18` | Size of each cell |
| `cellGap` | `number` | ❌ | `3` | Gap between cells |
| `cellBorderRadius` | `number` | ❌ | `6` | Border radius of cells |
| `weeksToShow` | `number` | ❌ | `12` | Number of weeks to display |
| `theme` | `Partial<ChartTheme>` | ❌ | Default theme | Custom theme |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode |
| `onDayPress` | `(day: HeatmapDay) => void` | ❌ | - | Callback when day is pressed |
| `onPeriodChange` | `(period: 'weekly' \| 'monthly') => void` | ❌ | - | Callback when period changes |
| `style` | `ViewStyle` | ❌ | - | Custom card style |
| `containerStyle` | `ViewStyle` | ❌ | - | Custom container style |

### ActivityBarChart Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `ChartDataPoint[]` | ✅ | - | Chart data points |
| `title` | `string` | ❌ | - | Chart title |
| `subtitle` | `string` | ❌ | - | Chart subtitle |
| `valueLabel` | `string` | ❌ | `'Sessions'` | Label for values |
| `showValues` | `boolean` | ❌ | `true` | Show values on bars |
| `showGrid` | `boolean` | ❌ | `true` | Show grid lines |
| `animated` | `boolean` | ❌ | `true` | Enable animations |
| `barWidth` | `number` | ❌ | `24` | Width of bars |
| `barBorderRadius` | `number` | ❌ | `8` | Border radius of bars |
| `maxValue` | `number` | ❌ | Auto-calculated | Maximum value for Y-axis |
| `theme` | `Partial<ChartTheme>` | ❌ | Default theme | Custom theme |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode |
| `onBarPress` | `(data: ChartDataPoint, index: number) => void` | ❌ | - | Callback when bar is pressed |
| `style` | `ViewStyle` | ❌ | - | Custom card style |
| `chartHeight` | `number` | ❌ | `200` | Height of chart |

### ProgressCard Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `string` | ✅ | - | MaterialCommunityIcons name |
| `value` | `number \| string` | ✅ | - | Value to display |
| `label` | `string` | ✅ | - | Label text |
| `subtitle` | `string` | ❌ | - | Subtitle text |
| `progress` | `number` | ❌ | - | Progress bar (0-1) |
| `progressColor` | `string` | ❌ | Theme color | Progress bar color |
| `theme` | `Partial<ChartTheme>` | ❌ | Default theme | Custom theme |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode |
| `iconColor` | `string` | ❌ | Theme color | Icon color |
| `iconBackgroundColor` | `string` | ❌ | Theme color | Icon background color |
| `size` | `'small' \| 'medium' \| 'large'` | ❌ | `'medium'` | Card size |
| `orientation` | `'vertical' \| 'horizontal'` | ❌ | `'vertical'` | Card orientation |
| `onPress` | `() => void` | ❌ | - | Callback when card is pressed |
| `style` | `ViewStyle` | ❌ | - | Custom card style |

### MonthlyChart Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `months` | `HeatmapMonth[]` | ✅ | - | Array of months |
| `days` | `HeatmapDay[]` | ✅ | - | Array of day data |
| `title` | `string` | ❌ | `'Monthly Activity'` | Chart title |
| `valueLabel` | `string` | ❌ | `'Sessions'` | Label for values |
| `showValues` | `boolean` | ❌ | `true` | Show values on bars |
| `chartHeight` | `number` | ❌ | `180` | Height of chart |
| `theme` | `Partial<ChartTheme>` | ❌ | Default theme | Custom theme |
| `darkMode` | `boolean` | ❌ | `false` | Enable dark mode |
| `onMonthPress` | `(month: HeatmapMonth, total: number) => void` | ❌ | - | Callback when month is pressed |
| `style` | `ViewStyle` | ❌ | - | Custom card style |

## 🛠️ Utility Functions

### Generate Heatmap Data

```tsx
import { generateHeatmapData } from '@rubixscript/react-native-productivity-charts';

const sessions = [
  { date: new Date('2025-01-01'), value: 5 },
  { date: new Date('2025-01-02'), value: 8 },
  // ... more sessions
];

const heatmapDays = generateHeatmapData(sessions, 150, 8);
```

### Generate Month Labels

```tsx
import { generateMonthLabels } from '@rubixscript/react-native-productivity-charts';

const months = generateMonthLabels(
  new Date('2025-01-01'),
  new Date('2025-12-31')
);
// Returns: [{ name: 'Jan', year: 2025, index: 0 }, ...]
```

### Group Data by Period

```tsx
import { groupByPeriod } from '@rubixscript/react-native-productivity-charts';

// Get daily data (last 7 days by default)
const dailyData = groupByPeriod(days, 'daily');

// Get weekly data
const weeklyData = groupByPeriod(days, 'weekly');

// Get monthly data
const monthlyData = groupByPeriod(days, 'monthly');
```

### Get Daily Chart Data

```tsx
import { getDailyChartData } from '@rubixscript/react-native-productivity-charts';

// Get last N days of data
const last7Days = getDailyChartData(days, 7);
const last30Days = getDailyChartData(days, 30);
```

### Get Weekly Chart Data

```tsx
import { getWeeklyChartData } from '@rubixscript/react-native-productivity-charts';

// Get aggregated weekly data (last 12 weeks by default)
const weeklyData = getWeeklyChartData(days);
```

### Calculate Intensity

```tsx
import { calculateIntensity } from '@rubixscript/react-native-productivity-charts';

// Calculate intensity level (0-1) from a value
const intensity = calculateIntensity(10, 8); // Returns: 1.0 (capped at 1)
const intensity2 = calculateIntensity(4, 8);  // Returns: 0.5
```

### Calculate Statistics

```tsx
import { calculateProductivityStats } from '@rubixscript/react-native-productivity-charts';

const stats = calculateProductivityStats(days);
console.log(stats.totalSessions);
console.log(stats.currentStreak);
console.log(stats.avgSessionsPerDay);
```

### Format Duration

```tsx
import { formatDuration } from '@rubixscript/react-native-productivity-charts';

const formatted = formatDuration(125); // "2h 5m"
const formatted2 = formatDuration(45); // "45m"
```

## 🎯 Custom Hooks

### useChartTheme

```tsx
import { useChartTheme } from '@rubixscript/react-native-productivity-charts';

const MyComponent = () => {
  const theme = useChartTheme({ primaryColor: '#FF6347' }, false);
  // Use theme in your components
};
```

### useProductivityData

```tsx
import { useProductivityData } from '@rubixscript/react-native-productivity-charts';

const MyComponent = () => {
  const { stats, dailyData, weeklyData } = useProductivityData({ days });

  return (
    <View>
      <Text>Total Sessions: {stats.totalSessions}</Text>
      <Text>Current Streak: {stats.currentStreak}</Text>
    </View>
  );
};
```

## 📖 Complete Example

```tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  HeatmapChart,
  ActivityBarChart,
  ProgressCard,
  MonthlyChart,
  generateHeatmapData,
  generateMonthLabels,
  useProductivityData,
  THEMES,
} from '@rubixscript/react-native-productivity-charts';

const ProductivityDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Generate sample data
  const sessions = [
    { date: new Date('2025-01-01'), value: 5 },
    { date: new Date('2025-01-02'), value: 8 },
    // ... add more sessions
  ];

  const days = generateHeatmapData(sessions, 150, 8);
  const months = generateMonthLabels(
    new Date(days[0].dateStr),
    new Date(days[days.length - 1].dateStr)
  );

  const { stats, dailyData } = useProductivityData({ days });

  return (
    <ScrollView style={styles.container}>
      {/* Progress Cards */}
      <View style={styles.row}>
        <ProgressCard
          icon="fire"
          value={stats.currentStreak}
          label="Day Streak"
          darkMode={darkMode}
        />
        <ProgressCard
          icon="clock-outline"
          value={Math.round(stats.totalTime / 60)}
          label="Hours"
          darkMode={darkMode}
        />
      </View>

      {/* Weekly Bar Chart */}
      <ActivityBarChart
        data={dailyData}
        title="Last 7 Days"
        valueLabel="Sessions"
        darkMode={darkMode}
        theme={THEMES.purple_light}
      />

      {/* Heatmap */}
      <HeatmapChart
        days={days}
        months={months}
        darkMode={darkMode}
        title="Activity Heatmap"
        onDayPress={(day) => console.log('Day:', day)}
      />

      {/* Monthly Chart */}
      <MonthlyChart
        months={months}
        days={days}
        title="Monthly Overview"
        valueLabel="Sessions"
        darkMode={darkMode}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
});

export default ProductivityDashboard;
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues, questions, and feature requests:
- 🐛 [Create an issue on GitHub](https://github.com/rubixscript/react-native-productivity-charts/issues)
- 📧 Email: support@rubixscript.com
- 💬 [Join our Discord community](https://discord.gg/rubixscript)

## 🙏 Acknowledgments

Built with:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)

## 🌟 Show Your Support

If this library helped you, please give it a ⭐️ on GitHub!

---

Made with ❤️ by the [RubixScript Team](https://www.rubixscript.com)
