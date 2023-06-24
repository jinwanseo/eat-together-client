import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

export default function MiniMap() {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {height: 300},
  mapView: {width: '100%', height: '100%'},
});
