import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Como deseja continuar ?</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/register_sensor')}
      >
        <Ionicons name="add-circle" size={24} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Cadastrar Sensor</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/monitoring')}
      >
        <Ionicons name="stats-chart" size={24} color="#1C7C7D" style={styles.icon} />
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Monitorar Dados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F6F8',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#1C7C7D',
  },

  button: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#1C7C7D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1C7C7D',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10, // Espaço entre ícone e texto
  },
  secondaryButtonText: {
    color: '#1C7C7D',
  },
  icon: {
    marginRight: -5, // Ajuste fino para alinhar com o texto
  },

  // --- Configurações ---
  settingsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8, // Espaço entre ícone e texto
  },
  settingsText: {
    fontSize: 14,
    color: '#1C7C7D',
    fontWeight: 'bold',
  },
});