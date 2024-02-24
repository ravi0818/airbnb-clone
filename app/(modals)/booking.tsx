import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={[defaultStyles.container, { height: "100%" }]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontFamily: "mon-sb", fontSize: 28, paddingBottom: 20 }}>
          Search
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Type something to search"
          value={searchText}
          onChangeText={setSearchText}
          style={[defaultStyles.inputField, { width: "90%" }]}
        />
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="search-outline" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booking;
