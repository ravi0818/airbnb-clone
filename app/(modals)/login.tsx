import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Divider, TextInput } from "react-native-paper";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Login = () => {
  const onPress = () => alert("Hello");
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error("OAuth Error: ", error);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <View style={{ marginVertical: 30 }}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />
      </View>
      <View>
        <Button buttonColor={Colors.primary} mode="contained" onPress={onPress}>
          <Text>Continue</Text>
        </Button>
      </View>
      <Divider style={{ marginVertical: 50 }} />
      <View style={{ gap: 30 }}>
        <View>
          <Button
            icon="google"
            mode="outlined"
            onPress={() => onSelectAuth(Strategy.Google)}
          >
            <Text>Continue with Google</Text>
          </Button>
        </View>

        <View>
          <Button
            icon="apple"
            mode="outlined"
            onPress={() => onSelectAuth(Strategy.Apple)}
          >
            <Text>Continue with Apple</Text>
          </Button>
        </View>

        <View>
          <Button
            icon="facebook"
            mode="outlined"
            onPress={() => onSelectAuth(Strategy.Facebook)}
          >
            <Text>Continue with Facebook</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
