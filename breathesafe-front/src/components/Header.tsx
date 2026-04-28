import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const Header = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1C7C7D',
    height: screenHeight * 0.12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;
