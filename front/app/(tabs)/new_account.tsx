import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AxiosError, AxiosResponse } from 'axios';
import api  from '../../src/services/api'; // Importando o serviço configurado

interface UserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
  };
  errors?: Record<string, string[]>;
}

interface ApiError {
  response?: {
    status: number;
    data: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
  message: string;
}

const Registre: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (): Promise<void> => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    const userData: UserData = {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    };

    try {
      const response: AxiosResponse<ApiResponse> = await api.post('/user', userData);
      
      Alert.alert('Sucesso', response.data.message || 'Conta criada com sucesso!');
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage: string = 'Houve um erro ao criar a conta.';
      
      if (axiosError.response) {
        // Tratamento de erros específicos do backend
        if (axiosError.response.status === 422 && axiosError.response.data.errors) {
          // Pega a primeira mensagem de erro
          const firstErrorKey = Object.keys(axiosError.response.data.errors)[0];
          errorMessage = axiosError.response.data.errors[firstErrorKey][0] || errorMessage;
        } else if (axiosError.response.data.message) {
          errorMessage = axiosError.response.data.message;
        }
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Criar Conta</Text>
        <Ionicons name="person-add" size={30} color="#1C7C7D" />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={(text: string) => setName(text)}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text: string) => setConfirmPassword(text)}
        editable={!isLoading}
      />
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
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
    paddingHorizontal: 20,
  },
  containerTitle: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  title: {
    fontSize: 24,
    color: '#1C7C7D',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  button: {
    backgroundColor: '#1C7C7D',
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#9BB5B5',
    opacity: 0.7,
  },
});

export default Registre;