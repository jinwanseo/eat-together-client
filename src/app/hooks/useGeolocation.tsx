import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';

export interface LocationType {
  latitude: number;
  longtitude: number;
}

export default function useGeolocation() {
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null,
  );
  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        info =>
          setCurrentLocation({
            latitude: info.coords.latitude,
            longtitude: info.coords.longitude,
          }),
        console.error,
        {
          enableHighAccuracy: true,
          timeout: 20000,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    currentLocation,
  };
}
