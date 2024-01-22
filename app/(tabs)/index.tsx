import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";

const Explore = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?limit=100"
    ).then((res) => res.json());
    setData(response.results);
    setTimeout(() => setLoading(false), 200);
  };
  useEffect(() => {
    fetchData();
  }, [category]);
  const onCategoryChange = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onCategoryChange} />,
        }}
      />
      <View>
        <Listing listing={loading ? [] : data} category={category} />
      </View>
    </View>
  );
};

export default Explore;
