import {View} from 'react-native';
import React, {MutableRefObject, useCallback, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {IOrder} from '../../../../../../../app/store/slices/orderSlice';

export default function MiniMap({start, end}: IOrder) {
  // Map Ref
  const mapRef: MutableRefObject<MapView | null> = useRef<MapView | null>(null);

  // Map Center 고정
  const centerMap = useCallback((): void => {
    if (start && end) {
      mapRef.current?.fitToSuppliedMarkers(['start', 'end'], {
        animated: false,
        edgePadding: {
          top: 150,
          left: 150,
          right: 150,
          bottom: 150,
        },
      });
    }
  }, [start, end]);

  return (
    <View
      className="bg-slate-50 h-[250px] shadow"
      onPress={e => e.stopPropagation()}>
      <MapView
        className="h-[100%] w-[100%]"
        ref={mapRef}
        onMapReady={centerMap}
        onMapLoaded={centerMap}
        region={{
          latitude: +start.latitude,
          longitude: +start.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}>
        <Marker
          title={start.name}
          description={'출발지'}
          coordinate={{
            latitude: +start.latitude,
            longitude: +start.longitude,
          }}
          identifier="start"
        />

        <Marker
          title={end.name}
          description={'도착지'}
          coordinate={{
            latitude: +end.latitude,
            longitude: +end.longitude,
          }}
          identifier="end"
        />
      </MapView>
    </View>
  );
}
