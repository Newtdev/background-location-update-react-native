/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {checkAndRequestPermissions} from './app/utils';
import BackgroundLocationWithNotifee from './app/BackgroundWithNotifee';
import BackgroundNoticationWithActions from './app/BackgroundNoticationWithActions';

function App(): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Payment App using GEO location </Text>
      {/* <BackgroundLocationWithNotifee /> */}
      <BackgroundNoticationWithActions />
      <Button title="Request Permission" onPress={checkAndRequestPermissions} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

