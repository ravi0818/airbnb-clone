import { View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import ListingMap from "@/components/ListingMap";
import ListingBottomSheet from "@/components/ListingBottomSheet";

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
  }, []);

  const onCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  // Use useMemo to memoize the ListingMap component
  const memoizedListingMap = useMemo(
    () => <ListingMap listing={loading ? [] : data} />,
    [data, loading]
  );

  // Use useMemo to memoize the ListingBottomSheet component
  const memoizedListingBottomSheet = useMemo(
    () => (
      <ListingBottomSheet listing={loading ? [] : data} category={category} />
    ),
    [data, loading, category]
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onCategoryChange} />,
        }}
      />
      <View>
        {memoizedListingMap}
        {memoizedListingBottomSheet}
      </View>
    </View>
  );
};

export default Explore;
