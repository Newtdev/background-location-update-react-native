import {useEffect, useRef} from 'react';
import {AppState, View, Text, StyleSheet} from 'react-native';
import {
  watchMerchantPosition,
  watchMerchantPositionSuccess,
  watchMerchantPositionError,
  startForegroundService,
} from './utils';
import Geolocation from 'react-native-geolocation-service';
import notifee from '@notifee/react-native';

import React from 'react';

export default function BackgroundLocationWithNotifee() {
  //when user is on
  useEffect(() => {
    let id: number = 0;
    (async function updateUserLocation() {
      id = watchMerchantPosition(
        position => watchMerchantPositionSuccess(position),
        error => watchMerchantPositionError(error as any),
      );
    })();

    return () => {
      Geolocation.clearWatch(id);
    };
  }, []);
  let watchId = useRef<number>(0);

  async function startLocationTracking() {
    // Start foreground service first
    await startForegroundService();

    watchId.current = watchMerchantPosition(
      position => watchMerchantPositionSuccess(position),
      error => watchMerchantPositionError(error as any),
    );
  }

  function stopLocationTracking(watchId: number) {
    Geolocation.clearWatch(watchId);
    notifee.stopForegroundService();
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          await startLocationTracking();
        } else {
          stopLocationTracking(watchId.current);
        }
      },
    );

    return () => {
      // clearTimeout(setTimeoutId);
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        Background Location Notification with Notifee and
        react-native-geolocation-service
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 16,
  },

  highlight: {
    fontWeight: '700',
  },
});
