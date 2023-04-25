import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

const LoginScreen = () => {
    
  return (
    <View style={tw`flex-1 items-center justify-center border-zinc-900`}>
      <Image source={require("../assets/logo.png")} />
      <View>
        <Text>Last 7 days</Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default LoginScreen;
