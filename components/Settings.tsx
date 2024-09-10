import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SettingsProps {
  visible: boolean;
  colors: {
    light: {r: number; g: number; b: number};
    dark: {r: number; g: number; b: number};
  };
  setColors: (colors: {
    light: {r: number; g: number; b: number};
    dark: {r: number; g: number; b: number};
  }) => void;
  onSubmit: () => void;
  onDiscard: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  visible,
  colors,
  setColors,
  onSubmit,
  onDiscard,
}) => {
  const [localColors, setLocalColors] = useState(colors);

  if (!visible) return null;

  const handleColorChange = (
    mode: 'light' | 'dark',
    color: 'r' | 'g' | 'b',
    value: string,
  ) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 255) {
      setLocalColors({
        ...localColors,
        [mode]: {...localColors[mode], [color]: newValue},
      });
    }
  };

  const lightColor = `rgb(${localColors.light.r}, ${localColors.light.g}, ${localColors.light.b})`;
  const darkColor = `rgb(${localColors.dark.r}, ${localColors.dark.g}, ${localColors.dark.b})`;

  return (
    <View style={styles.popupOverlay}>
      <View style={styles.popup}>
        <Text style={styles.popupText}>Settings</Text>
        {['light', 'dark'].map(mode => (
          <View key={mode} style={styles.colorContainer}>
            <Text style={styles.popupText}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Background
            </Text>
            <View style={styles.colorInputs}>
              {['r', 'g', 'b'].map(color => (
                <TextInput
                  key={color}
                  style={styles.input}
                  placeholder={color.toUpperCase()}
                  keyboardType="numeric"
                  value={localColors[mode][color].toString()}
                  onChangeText={value => handleColorChange(mode, color, value)}
                />
              ))}
            </View>
            <View
              style={[
                styles.colorPreview,
                {backgroundColor: mode === 'light' ? lightColor : darkColor},
              ]}
            />
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              setColors(localColors);
              onSubmit();
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={() => {
              setLocalColors(colors); // Reset to initial colors
              onDiscard();
            }}>
            <Text style={styles.buttonText}>Don't Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  popup: {
    width: 320,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
  colorContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  colorInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '30%',
    paddingHorizontal: 10,
    color: 'black',
  },
  colorPreview: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  discardButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Settings;
