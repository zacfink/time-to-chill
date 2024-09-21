import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import NameModal from './components/NameModal.tsx';
import Settings from './components/Settings';

export default function App() {
  const [name, setName] = useState('');
  const [nameModalVisible, setNameModalVisible] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  const [colors, setColors] = useState<{
    light: {r: number; g: number; b: number};
    dark: {r: number; g: number; b: number};
  }>({
    light: {r: 66, g: 135, b: 245},
    dark: {r: 18, g: 45, b: 166},
  });
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? `rgb(${colors.dark.r}, ${colors.dark.g}, ${colors.dark.b})`
      : `rgb(${colors.light.r}, ${colors.light.g}, ${colors.light.b})`;

  const [time, setTime] = useState(() => {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedTime =
        hours +
        ':' +
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0') +
        ' ' +
        ampm;

      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNameSubmit = () => {
    setNameModalVisible(false);
  };

  const handleSettingsSubmit = () => {
    setSettingsVisible(false);
  };

  const handleDiscardSettings = () => {
    setSettingsVisible(false);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.center}>
        <NameModal
          visible={nameModalVisible}
          name={name}
          setName={setName}
          onSubmit={handleNameSubmit}
        />
        <Text style={styles.nameText}>
          {name ? 'Hello, ' + name + '!' : 'Hello!'}
        </Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSettingsVisible(true)}
        style={styles.settingsButton}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <Settings
        visible={settingsVisible}
        colors={colors}
        setColors={setColors}
        onSubmit={handleSettingsSubmit}
        onDiscard={handleDiscardSettings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    margin: 10,
    fontSize: 48,
  },
  timeText: {
    margin: 10,
    fontSize: 36,
  },
  settingsButton: {
    margin: 100,
    alignItems: 'center',
  },
});
