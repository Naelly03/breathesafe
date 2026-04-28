import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ConnectDeviceScreen = () => {
  const handleWifiConnection = () => {
    Alert.alert('Conexão via WiFi iniciada');
  };

  const handleBluetoothConnection = () => {
    Alert.alert('Conexão via Bluetooth iniciada');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao dispositivo</Text>
      <Text style={styles.subtitle}>Escolha como deseja conectar ao sensor</Text>

      <TouchableOpacity style={styles.button} onPress={handleWifiConnection}>
        <MaterialCommunityIcons name="wifi" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Conectar via WiFi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleBluetoothConnection}>
        <MaterialCommunityIcons name="bluetooth" size={20} color="#1C7C7D" style={styles.icon} />
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Conectar via Bluetooth</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Certifique-se de que o dispositivo está ligado e pronto para emparelhamento!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F6F8', 
    padding: 16, 
  },
  title: {
    fontSize: 24, 
    marginBottom: 10, 
    color: '#1C7C7D', 
  },
  subtitle: {
    fontSize: 16, 
    color: '#5D6D7E', 
    marginBottom: 20, 
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1C7C7D',
    paddingVertical: 15, 
    paddingHorizontal: 50, 
    borderRadius: 8, 
    marginVertical: 10, 
    width: '80%', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  secondaryButton: {
    backgroundColor: '#FFF', 
    borderWidth: 2, 
    borderColor: '#1C7C7D', 
  },
  icon: {
    marginRight: 10, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  secondaryButtonText: {
    color: '#1C7C7D', 
  },
  footerText: {
    fontSize: 14, 
    color: '#5D6D7E', 
    marginTop: 20,
    textAlign: 'center', 
  },
});

export default ConnectDeviceScreen;