import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao BreatheSafe!</Text>
      <Text style={styles.subtitle}>Como deseja continuar?</Text>

      <TouchableOpacity 
        style={styles.buttonPrimary} 
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonPrimaryText}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.buttonPrimary, styles.buttonSecondary]} 
        onPress={() => router.push('/connection')}
      >
        <Text style={[styles.buttonPrimaryText, styles.buttonSecondaryText]}>Acessar sem Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Com uma conta, você pode salvar dados, acessar histórico e configurar alertas personalizados.
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#1C7C7D', 
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4A4A4A', 
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#1C7C7D', 
    paddingVertical: 15,
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  buttonPrimaryText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#FFF', 
    borderWidth: 2,
    borderColor: '#1C7C7D', 
  },
  buttonSecondaryText: {
    color: '#1C7C7D', 
  },
  footerText: {
    fontSize: 14,
    color: '#5A5A5A', 
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});

export default LoginScreen;