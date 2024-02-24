import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

interface IListingMapProps {
  listing: any;
}
const ListingMap = memo(({ listing }: IListingMapProps) => {
  const router = useRouter();
  const onMarkerClicked = (item: any) => {
    router.push(`/listing/${item.id}`);
  };
  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  return (
    <View style={{ marginTop: 150 }}>
      <MapView
        initialRegion={INITIAL_REGION}
        style={{ height: "100%", width: "100%" }}
        showsUserLocation
        showsCompass
        clusterColor="#FFF"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
      >
        {listing.map((item: any) => {
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.geolocation.lat,
                longitude: item.geolocation.lon,
              }}
              onPress={() => onMarkerClicked(item)}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 10,
                  elevation: 5,
                  shadowRadius: 6,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 1, height: 10 },
                }}
              >
                <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
});

export default ListingMap;
