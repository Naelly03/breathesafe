import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useRouter } from 'expo-router'; 

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require('../../src/assets/images/logo.png')} style={styles.image} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F6F8',
  },
  image: {
    width: 500,
    height: 500,
  },
});
