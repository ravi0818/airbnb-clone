import { View, FlatList, ListRenderItem, Text, Image } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  listing: any[];
  category: string;
}
// const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const renderData: ListRenderItem<any> = ({ item }: any) => (
  <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View
        entering={FadeInLeft}
        exiting={FadeOutRight}
        style={{ marginVertical: 10, backgroundColor: "#FFF" }}
      >
        <Image
          source={{ uri: item.medium_url }}
          style={{ height: 250, borderRadius: 10 }}
        />

        <View style={{ gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: "mon-b", maxWidth: "85%" }}>
              {item.name}
            </Text>
            <View style={{ padding: 5, flexDirection: "row" }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>{item.room_type}</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
                <Text style={{ fontFamily: "mon" }}>night</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  </Link>
);
const Listing = ({ listing, category }: Props) => {
  useEffect(() => {
    // console.log(listing);
  }, [category]);
  return (
    <View style={[defaultStyles.container, { marginTop: 140, height: "100%" }]}>
      <FlatList renderItem={renderData} data={listing} />
    </View>
  );
};

export default Listing;
