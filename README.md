# React Native Background Location Services: Beyond the Basics

A comprehensive demo implementation of background location tracking in React Native, showcasing continuous location updates for applications like E-hailing platforms. This repository accompanies our article exploring the implementation of background location tracking using `react-native-geolocation-service` and `react-native-background-actions`.

![Demo](https://github.com/user-attachments/assets/d8bc5cb0-9720-4e8e-8aee-308f636ec852)

## Features

- **Background Location Tracking**: Continuous location updates even when the app is in the background
- **Cross-Platform Support**: Implementations for both Android and iOS with platform-specific configurations
- **Customizable**: Configurable settings for update intervals and distance filters
- **Foreground & Background Services**: Simple UI with "Start task" and "Stop task" buttons

## Prerequisites

- Node.js
- Yarn or npm
- React Native development environment (Android Studio for Android, Xcode for iOS)
- Basic React Native knowledge

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/react-native-background-location-demo.git
   cd react-native-background-location-demo
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup**:
   ```bash
   cd ios && pod install && cd ..
   ```

## Setup & Configuration

### iOS Configuration

Add the following keys to your `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>App needs location access for tracking</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>App needs location access for background tracking</string>
<key>UIBackgroundModes</key>
<array>
    <string>location</string>
</array>
```

### Android Configuration

Add these permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Usage

### Running the Project

```bash
# For Android
yarn react-native run-android
# or
npm run android

# For iOS
yarn react-native run-ios
# or
npm run ios
```

### Basic Operations

1. **Start Location Tracking**:
   - Tap the "Start task" button
   - The app will begin tracking location in the background

2. **Stop Location Tracking**:
   - Tap the "Stop task" button
   - Location tracking service will be stopped
   - Location watcher will be cleared

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:
- Open an issue in this repository
- Check out our detailed article about the implementation
- Review the demo video and screenshots

---

Built with ❤️ by NewtDev

Happy coding!
