import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { ScrollView } from "react-native-gesture-handler";
import React, { useRef, useState } from "react";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const categoryRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = categoryRef.current[index];
    setActiveIndex(index);
    // selected?.measure((x, y, width, height, pageX, pageY) => {
    //   console.log(x, y, width, height, pageX, pageY);
    //   scrollRef.current?.scrollTo({
    //     x: pageX - 16,
    //     y: 0,
    //     animated: true,
    //   });
    // });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].name);
  };
  return (
    <SafeAreaView
      style={[
        defaultStyles.AndroidSafeArea,
        { flex: 1, backgroundColor: "#fff" },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <View>
                <Ionicons name="search" size={24} />
              </View>
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text>Anywhere . Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollRef}
          collapsable={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            gap: 25,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((category, index) => {
            return (
              <TouchableOpacity
                key={index}
                ref={(el) => (categoryRef.current[index] = el)}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
                onPress={(event) => selectCategory(index)}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={24}
                  color={activeIndex === index ? "#000" : Colors.grey}
                />
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 150,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 10,
  },

  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    alignItems: "center",
    width: 260,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#A2A0A2",
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
