import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Listing from "./Listing";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface IListingBottomSheetProps {
  listing: any[];
  category: string;
}
const ListingBottomSheet = ({
  listing,
  category,
}: IListingBottomSheetProps) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [currentSnap, setCurrentSnap] = useState<number>(0);

  const snapPoints = useMemo(() => ["10%", "80%"], []);

  const handleSheetChange = useCallback((index: any) => {
    setCurrentSnap(index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const renderFooter = useCallback(
    (props: any) => {
      if (currentSnap === 0) {
        return null;
      }

      return (
        <BottomSheetFooter {...props} bottomInset={24}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handleSnapPress(0)}
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: Colors.dark,
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontFamily: "mon-sb", color: "#FFF" }}>Map</Text>
              <Ionicons name="map" size={20} color={"#FFF"} />
            </TouchableOpacity>
          </View>
        </BottomSheetFooter>
      );
    },
    [currentSnap]
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      footerComponent={renderFooter}
    >
      <BottomSheetScrollView>
        <Listing listing={listing} category={category} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default ListingBottomSheet;
