/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startForegroundService} from './app/utils';
import notifee from '@notifee/react-native';

notifee.registerForegroundService(notification => {
  console.log('🚀 ~ notification:', notification);
  return new Promise(async () => {
    await startForegroundService().catch(err => err);
    // Long running task...
  });
});

AppRegistry.registerComponent(appName, () => App);
