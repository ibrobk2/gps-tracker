import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration here
  // Your firebase config here
  apiKey: "AIzaSyCWhbS6PU3WldQofV8yIg3uAoVHtO6dkNM",
     authDomain: "gps-tracker-db118.firebaseapp.com",
     projectId: "gps-tracker-db118",
     storageBucket: "gps-tracker-db118.firebasestorage.app",
     messagingSenderId: "252591472515",
     appId: "1:252591472515:web:5c3b2962640b9b13c5c0b6",
     measurementId: "G-X4LL22CQ8F"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const updateLocationInDatabase = (coords: Location.LocationObjectCoords) => {
      set(ref(database, 'users/location'), {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (newLocation) => {
          updateLocationInDatabase(newLocation.coords);
          setLocation(newLocation.coords);
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
