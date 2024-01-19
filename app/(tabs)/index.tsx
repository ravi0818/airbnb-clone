import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";

const Explore = () => {
  const [category, setCategory] = useState("");
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
      <View style={{ marginTop: 150 }}>
        <Listing listing={[]} category={category} />
      </View>
    </View>
  );
};

export default Explore;
