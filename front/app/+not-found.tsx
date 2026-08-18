import { StyleSheet, Text, View } from 'react-native';

const NotFoundPage = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Página não encontrada!</Text>
  </View>
);

export default NotFoundPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
