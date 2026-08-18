import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api'; // Ajuste esse caminho conforme seu projeto

const screenWidth = Dimensions.get('window').width;

interface SensorData {
  co_concentration: number;
  co_level: string;
  date_hour: string;
}

const RealTimeMonitoring = () => {
  const router = useRouter();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [historico, setHistorico] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await api.get('/readings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Exemplo de resposta:
      // {
      //   co_concentration: number,
      //   co_level: string,
      //   date_hour: string,
      //   historico: number[]  (valores para gráfico)
      // }
      const data = response.data;

      setSensorData({
        co_concentration: data.co_concentration,
        co_level: data.co_level,
        date_hour: data.date_hour,
      });

      if (data.historico && Array.isArray(data.historico)) {
        setHistorico(data.historico);
      } else {
        setHistorico([200, 300, 400, 350, 300, 400]); // fallback
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('userToken');
        Alert.alert('Sessão expirada', 'Faça login novamente', [
          { text: 'OK', onPress: () => router.replace('/login') },
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do sensor.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1C7C7D" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Monitoramento de CO</Text>

      <View style={styles.card}>
        <FontAwesome5 name="wind" size={26} color="#1C7C7D" style={styles.icon} />
        <Text style={styles.infoText}>Concentração Atual:</Text>
        <Text style={styles.value}>
          {sensorData?.co_concentration != null ? sensorData.co_concentration.toFixed(1) : '--'} ppm
        </Text>

        <View style={styles.levelContainer}>
          <Text style={[styles.levelLabel, sensorData?.co_level === 'Seguro' && styles.safe]}>
            Seguro
          </Text>
          <Text style={[styles.levelLabel, sensorData?.co_level === 'Moderado' && styles.moderate]}>
            Moderado
          </Text>
          <Text style={[styles.levelLabel, sensorData?.co_level === 'Perigoso' && styles.danger]}>
            Perigoso
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons name="chart-line" size={26} color="#1C7C7D" style={styles.icon} />
        <Text style={styles.infoText}>Histórico de CO</Text>
        <LineChart
          data={{
            labels: historico.map((_, i) => (i + 1).toString()),
            datasets: [{ data: historico }],
          }}
          width={screenWidth * 0.85}
          height={220}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(28, 124, 125, ${opacity})`,
            labelColor: () => '#37474F',
          }}
          style={{ marginVertical: 8, borderRadius: 8 }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/config')}>
        <Ionicons name="settings" size={20} color="#FFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/history')}
      >
        <Ionicons name="calendar" size={20} color="#1C7C7D" style={styles.buttonIcon} />
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Histórico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F2F6F8',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: '#1C7C7D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 17,
    color: '#37474F',
    marginBottom: 10,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1C7C7D',
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  levelLabel: {
    fontSize: 14,
    color: '#37474F',
  },
  safe: {
    color: '#43A047',
    fontWeight: 'bold',
  },
  moderate: {
    color: '#FFA726',
    fontWeight: 'bold',
  },
  danger: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    backgroundColor: '#1C7C7D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1C7C7D',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#1C7C7D',
  },
});

export default RealTimeMonitoring;
