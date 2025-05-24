//utils.ts
import Geolocation, {
  ErrorCallback,
  GeoError,
  GeoPosition,
  SuccessCallback,
} from 'react-native-geolocation-service';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';

// request location permission
const requestLocationPermissions = async () => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('always');
    return status === 'granted';
  }

  if (Platform.OS === 'android') {
    // Request ACCESS_FINE_LOCATION
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your location to find nearby payment opportunities',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      // Request ACCESS_BACKGROUND_LOCATION
      const backgroundPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'To continue receiving nearby payment opportunities, please allow background location access. ' +
            'You can change this anytime in your device settings.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return backgroundPermission === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  }
};

//REQUEST NOTIFICATION PERMISSION
async function requestNotificationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
}
const requestAllPermissions = async () => {
  try {
    const locationGranted = await requestLocationPermissions();
    const notificationsGranted = await requestNotificationPermission();
    return locationGranted && notificationsGranted;
  } catch (error) {
    //throw 'Error requesting permissions:', error);
    return false;
  }
};

// permission for location
export const checkAndRequestPermissions = async () => {
  try {
    const hasPermissions = await requestAllPermissions();
    if (hasPermissions) {
      //All required permissions granted
      // Start location tracking or other functionality here
    } else {
      //'Required permissions not granted
    }
  } catch (err) {
    //'throw Error requesting permissions:'
  }
};
//permission request notifiction

export const getCurrentLocationPosition = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

//implement a watch list function that update the user location when the user is on the foreground
export const watchMerchantPosition = (
  successFn: SuccessCallback,
  errorFn: ErrorCallback,
) => {
  const watchID = Geolocation.watchPosition(successFn, errorFn, {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    distanceFilter: 100, // Update when at least 10 meters moved
    interval: 5000, // Android-only: interval in milliseconds
    fastestInterval: 2000, // Android-only: fastest interval
    showLocationDialog: true, // Android: show dialog when settings need adjustment
    forceRequestLocation: true, // Android: force request location even if denied previously
    showsBackgroundLocationIndicator: true, // iOS specific
  });

  return watchID;
};

export function watchMerchantPositionSuccess(position: GeoPosition) {
  return position;

  //update backend logic
}
export function watchMerchantPositionError(error: GeoError) {
  return error;
}

export async function startForegroundService() {
  const channelId = await notifee.createChannel({
    id: 'location..',
    name: 'Location Tracking',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: 'Location Tracking Active',
    body: 'Your location is being tracked',
    android: {
      channelId,
      asForegroundService: true,
      ongoing: true,
      importance: AndroidImportance.HIGH,
    },
  });
}

export const backgroundNotificationOption = {
  taskName: 'Location Change',
  taskTitle: 'Latest Location',
  taskDesc:
    "We're reading and updating your location change to enhance our GEO-location payment method. So you can recieve payment faster",
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  linkingURI: 'blinkmerchant',
  parameters: {
    delay: 1000,
  },
};
