import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AxiosError, AxiosResponse } from 'axios';
import  api  from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginData {
  email: string;
  password: string;
}

interface TokenData {
  abilities: string[];
  expiresAt: string | null;
  lastUsedAt: string | null;
  name: string | null;
  token: string;
  type: string;
}

interface ApiResponse {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  token: TokenData;
  message?: string;
  errors?: Record<string, string[]>;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<ApiResponse> = await api.post('/session', {
        email,
        password
      });

      const authToken = response.data.token.token;
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        createdAt: response.data.createdAt
      };

      console.log('Token de acesso:', authToken);
      console.log('Dados do usuário:', userData);

      await AsyncStorage.setItem('userToken', authToken);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.push('/guest');

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = 'Houve um erro ao fazer login.';
      
      if (axiosError.response?.status === 401) {
        errorMessage = 'E-mail ou senha incorretos.';
      } else if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      console.error('Erro detalhado:', error);
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Login</Text>
        <Ionicons name="log-in" size={30} color="#1C7C7D" />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
        <TouchableOpacity 
          style={styles.eyeButton} 
          onPress={toggleSecureEntry}
          disabled={isLoading}
        >
          <Ionicons 
            name={secureTextEntry ? "eye-off" : "eye"} 
            size={22} 
            color="#888" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => router.push('/new_account')}
        disabled={isLoading}
      >
        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerTextBold}>Registre-se</Text>
        </Text>
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
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 10,
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
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#555',
    fontSize: 14,
  },
  registerTextBold: {
    fontWeight: 'bold',
    color: '#1C7C7D',
  },
});

export default Login;