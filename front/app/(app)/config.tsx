import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Importando o useRouter

const ConfigurationsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [alertLevel, setAlertLevel] = useState(50);
  const [connectedDevices, setConnectedDevices] = useState(['Sensor ESP32 - Cozinha']);
  const [unit, setUnit] = useState('ppm');
  const router = useRouter(); // Hook do router

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const increaseAlertLevel = () => setAlertLevel(alertLevel + 10);
  const decreaseAlertLevel = () => setAlertLevel(alertLevel > 10 ? alertLevel - 10 : 10);
  const toggleUnit = () => setUnit(unit === 'ppm' ? 'mg/m³' : 'ppm');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/monitoring')}>  {/* Usando o router.push */}
          <Ionicons name="arrow-back" size={28} color="#1C7C7D" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingRow}>
          <Ionicons name="notifications" size={20} color="#1C7C7D" style={styles.icon} />
          <Text style={styles.settingText}>Notificações</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#D0D0D0", true: "#1C7C7D" }}
          thumbColor="#FFF"
        />
      </View>

      {/* Configurar nível de alerta */}
      <View style={styles.settingItem}>
        <View style={styles.settingRow}>
          <Ionicons name="alert-circle" size={20} color="#1C7C7D" style={styles.icon} />
          <Text style={styles.settingText}>Nível de Alerta</Text>
        </View>
        <View style={styles.inlineGroup}>
          <TouchableOpacity style={styles.smallButton} onPress={decreaseAlertLevel}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.alertLevelText}>{alertLevel} {unit}</Text>
          <TouchableOpacity style={styles.smallButton} onPress={increaseAlertLevel}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingRow}>
          <Ionicons name="hardware-chip" size={20} color="#1C7C7D" style={styles.icon} />
          <Text style={styles.settingText}>Dispositivos Conectados</Text>
        </View>
        <FlatList
          data={connectedDevices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.deviceItem}>
              <Ionicons name="wifi" size={16} color="#5D6D7E" />
              <Text style={styles.deviceText}>{item}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingRow}>
          <Ionicons name="swap-horizontal" size={20} color="#1C7C7D" style={styles.icon} />
          <Text style={styles.settingText}>Unidade de Medida</Text>
        </View>
        <TouchableOpacity style={styles.unitButton} onPress={toggleUnit}>
          <Text style={styles.buttonText}>Alternar ({unit})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F2F6F8',
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    padding: 4,
  },
  title: {
    fontSize: 24,
    color: '#1C7C7D',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C7C7D',
  },
  inlineGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1C7C7D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  alertLevelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#37474F',
    minWidth: 80,
    textAlign: 'center',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 8,
    gap: 8,
  },
  deviceText: {
    fontSize: 14,
    color: '#5D6D7E',
  },
  unitButton: {
    padding: 12,
    backgroundColor: '#1C7C7D',
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfigurationsScreen;
