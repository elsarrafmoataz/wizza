import { View } from "react-native";
import MapView, { Marker, Circle as MapCircle, Region } from "react-native-maps";

type Point = { lat: number; lng: number };

type Props = {
  point: Point | null;
  region: Region;
  radiusKm: number;
  onRegionChange: (region: Region) => void;
  onPointChange: (point: Point) => void;
};

export function MapPicker({ point, region, radiusKm, onRegionChange, onPointChange }: Props) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      region={region}
      onRegionChangeComplete={onRegionChange}
      onPress={(e) =>
        onPointChange({
          lat: e.nativeEvent.coordinate.latitude,
          lng: e.nativeEvent.coordinate.longitude,
        })
      }
    >
      {point && (
        <>
          <Marker
            coordinate={{ latitude: point.lat, longitude: point.lng }}
            draggable
            onDragEnd={(e) =>
              onPointChange({
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude,
              })
            }
          />
          <MapCircle
            center={{ latitude: point.lat, longitude: point.lng }}
            radius={radiusKm * 1000}
            strokeColor="#22A652"
            fillColor="rgba(34,166,82,0.15)"
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
}
