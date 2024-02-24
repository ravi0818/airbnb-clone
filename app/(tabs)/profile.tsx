import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    try {
      setIsLoading(true);
      await user?.update({ firstName, lastName });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCaptureImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
        base64: true,
      });

      if (!result.canceled) {
        const base64 = `data:image/png;base64,${result.assets[0].base64}`;
        await user?.setProfileImage({ file: base64 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={defaultStyles.AndroidSafeArea}>
      <Stack.Screen
        options={{
          header: () => <View></View>,
        }}
      />
      <View style={styles.headerContainer}>
        <Text style={{ fontFamily: "mon-b", fontSize: 26 }}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>
      {user && !isLoading && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          {isEdit ? (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TextInput
                placeholder="First Name"
                value={firstName}
                style={[defaultStyles.inputField]}
                onChangeText={setFirstName}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                style={[defaultStyles.inputField]}
                onChangeText={setLastName}
              />
              <Ionicons
                name="checkmark-outline"
                size={26}
                onPress={onSaveUser}
                color={"green"}
                style={{ alignSelf: "center" }}
              />
            </View>
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "mon-sb", fontSize: 22 }}>
                {firstName} {lastName}
              </Text>
              <Ionicons
                name="create-outline"
                size={26}
                onPress={() => setIsEdit(true)}
              />
            </View>
          )}
          <View
            style={{
              flex: 1,
              gap: 10,
              justifyContent: "flex-start",
              paddingTop: 20,
            }}
          >
            <Text>{email}</Text>
            <Text>Member since {user?.createdAt?.toLocaleDateString()}</Text>
          </View>
        </View>
      )}
      {isLoading && (
        <View style={[styles.card, { justifyContent: "center" }]}>
          <Text>Loading...</Text>
        </View>
      )}

      {isSignedIn && (
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 10 }}
        >
          <Button title="Log out" onPress={() => signOut()} />
        </View>
      )}
      {!isSignedIn && (
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 10 }}
        >
          <Link href="/(modals)/login" asChild>
            <Button title="Log in" />
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },

  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "94%",
    height: "85%",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Profile;
