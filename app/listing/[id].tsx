import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Animated, { SlideInDown, useAnimatedRef } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?where=id%3D${id}&limit=20`
    ).then((res) => res.json());
    setData(response.results[0]);
    setTimeout(() => setLoading(false), 200);
  };
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <View style={[defaultStyles.container, { height: "100%" }]}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: data.medium_url }}
          style={{ height: 250, borderRadius: 10 }}
        />
        <View style={{ gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    fontFamily: "mon-b",
                    fontSize: 16,
                    maxWidth: "85%",
                  }}
                >
                  {data.name}
                </Text>
                <Text style={{ fontFamily: "mon-b" }}>
                  {data.room_type} in {data.smart_location}
                </Text>
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <Ionicons name="star" size={16} />
                  <Text style={{ fontFamily: "mon-sb" }}>
                    {data.review_scores_rating / 20} · {data.number_of_reviews}{" "}
                    reviews
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Colors.grey,
                  height: StyleSheet.hairlineWidth,
                  marginVertical: 16,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  source={{ uri: data.host_picture_url }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: Colors.grey,
                  }}
                />

                <View>
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    Hosted by {data.host_name}
                  </Text>
                  <Text>Host since {data.host_since}</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: Colors.grey,
                  height: StyleSheet.hairlineWidth,
                  marginVertical: 16,
                }}
              ></View>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  fontFamily: "mon",
                  marginBottom: 80,
                }}
              >
                {data.description}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
              }}
            >
              ${data.price}
            </Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Page;
