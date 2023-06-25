import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {IOrder} from '../OrderList';

export default function MiniMap({start, end}: IOrder) {
  console.log(start, end, +start.latitude);

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.mapView}>
        <Marker
          title={start.name}
          description={'출발지'}
          coordinate={{latitude: +start.latitude, longitude: +start.longitude}}
        />

        <Marker
          title={end.name}
          description={'도착지'}
          coordinate={{latitude: +end.latitude, longitude: +end.longitude}}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {height: 300},
  mapView: {width: '100%', height: '100%'},
});
