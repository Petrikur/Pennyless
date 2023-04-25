import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Button = ({ onPress, title }) => {
    return (
        <View style={tw`flex justify-center items-center `}>
          <TouchableOpacity
            style={tw`bg-blue-500 p-4 rounded items-center mt-4`}
            onPress={onPress}
          >
            <Text style={tw`text-white text-lg`}>{title}</Text>
          </TouchableOpacity>
        </View>
      );

};

export default Button;
