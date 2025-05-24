import React, {useEffect, useRef} from 'react';
import {AppState, Button, StyleSheet, Text, View} from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import {
  backgroundNotificationOption,
  watchMerchantPosition,
  watchMerchantPositionError,
  watchMerchantPositionSuccess,
} from './utils';
import Geolocation from 'react-native-geolocation-service';

export default function BackgroundNoticationWithActions() {
  const watchId = useRef<number | null>(null);

  BackgroundJob.on('expiration', () => {
    console.log('iOS: I am being closed!');
  });

  const stopBackgroundTracking = async () => {
    if (BackgroundJob.isRunning()) {
      await BackgroundJob.stop();
      Geolocation.clearWatch(watchId.current as never);
    }
    console.log('Background tracking stopped');
  };

  async function startBackgroundJob() {
    try {
      await BackgroundJob.start(async () => {
        console.log('background job started');
        await new Promise<void>(async resolve => {
          // Store the watch ID so we can clear it later
          watchId.current = watchMerchantPosition(
            position =>
              console.log(
                '🚀 ~ awaitBackgroundJob.start ~ position:',
                position,
              ),
            error => watchMerchantPositionError(error),
          );
        });
      }, backgroundNotificationOption);
    } catch (error) {
      console.error('Background job error:', error);
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'background') {
          await startBackgroundJob();
          await BackgroundJob.updateNotification({
            taskDesc: 'New ExampleTask description',
          });
        } else {
          await stopBackgroundTracking();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        Background Location Notification with react-native-background-actions
        and react-native-geolocation-service
      </Text>
      <Button title="Start task" onPress={startBackgroundJob} />
      <Button title="Stop task" onPress={stopBackgroundTracking} />
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
    lineHeight: 20,
  },

  highlight: {
    fontWeight: '700',
  },
});
