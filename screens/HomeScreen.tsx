import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import Popup from '../components/Popup';
import Settings from '../components/Settings';

// Import a settings icon (you can use your own icon or download one)
import settingsIcon from '../assets/settings.png'; // Replace with the path to your settings icon

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [time, setTime] = useState<string>(() => {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes();
  });
  const [name, setName] = useState<string>('');
  const [popupVisible, setPopupVisible] = useState<boolean>(true);
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
    setPopupVisible(false);
  };

  const handleSettingsSubmit = () => {
    setSettingsVisible(false);
  };

  const handleDiscardSettings = () => {
    setSettingsVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <Popup
        visible={popupVisible}
        name={name}
        setName={setName}
        onSubmit={handleNameSubmit}
      />
      <View style={styles.center}>
        <Text style={styles.centerText}>
          {name ? 'Hello, ' + name + '!' : 'Hello!'}
        </Text>
        <Text style={styles.centerTime}>{time}</Text>
      </View>
      {/* Floating Settings Icon */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setSettingsVisible(true)}>
        <Image source={settingsIcon} style={styles.settingsIcon} />
      </TouchableOpacity>
      <Settings
        visible={settingsVisible}
        colors={colors}
        setColors={setColors}
        onSubmit={handleSettingsSubmit}
        onDiscard={handleDiscardSettings} // Pass onDiscard to the Settings component
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 62,
  },
  centerTime: {
    fontSize: 49,
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  settingsIcon: {
    width: 40,
    height: 40,
  },
});

export default HomeScreen;
