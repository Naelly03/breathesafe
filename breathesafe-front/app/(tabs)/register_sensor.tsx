import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import api from '../../src/services/api';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sensor {
  modelo: string;
  data_instalacao: string;
  status: string;
}

interface ApiResponse {
  id: number;
  modelo: string;
  data_instalacao: string;
  status: string;
  message?: string;
  errors?: Record<string, string[]>;
}

type BackendErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

const RegisterSensor: React.FC = () => {
  const router = useRouter();
  const [sensor, setSensor] = useState<Sensor>({
    modelo: '',
    data_instalacao: '',
    status: 'ativo',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!sensor.modelo || !sensor.data_instalacao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const token = await AsyncStorage.getItem('userToken');
  
      const payload = {
        model: sensor.modelo,
        status: sensor.status === 'ativo', 
        ['installation-date']: sensor.data_instalacao,
      };
  
      const response = await api.post<ApiResponse>(
        '/sensor',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      Alert.alert('Sucesso', response.data.message || 'Sensor cadastrado com sucesso!');
      router.push('/connection');
    } catch (error) {
      await handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleApiError = async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;

      const errorData = serverError.response?.data as BackendErrorResponse;

      if (serverError.response?.status === 401) {
        await AsyncStorage.removeItem('userToken');
        Alert.alert(
          'Sessão Expirada',
          'Sua sessão expirou. Por favor, faça login novamente.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
        return;
      }

      if (serverError.response?.status === 422) {
        const errorMessage = Object.values(errorData?.errors || {})
          .flat()
          .join('\n');
        Alert.alert('Erro de Validação', errorMessage || 'Dados inválidos');
        return;
      }

      const fallbackMessage = errorData?.message || serverError.message || 'Erro ao cadastrar sensor';
      Alert.alert('Erro', fallbackMessage);
    } else if (error instanceof Error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Erro', 'Erro desconhecido ao cadastrar sensor');
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      setSensor((prev) => ({ ...prev, data_instalacao: isoDate }));

      const brFormatted = selectedDate.toLocaleDateString('pt-BR');
      setDisplayDate(brFormatted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Sensor</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo do Sensor (ex.: MQ-9)"
        placeholderTextColor="#888"
        value={sensor.modelo}
        onChangeText={(text) => setSensor({ ...sensor, modelo: text })}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => !isLoading && setShowDatePicker(true)}
        disabled={isLoading}
      >
        <Text style={{ color: displayDate ? '#000' : '#888' }}>
          {displayDate || 'Data de Instalação (DD/MM/AAAA)'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="add-circle-outline" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cadastrar</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F6F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1C7C7D',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  button: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#1C7C7D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9BB5B5',
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterSensor;
