import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Button = ({ onPress, title, styles }) => {
  return (
   
      <TouchableOpacity
        style={tw`${styles} bg-gray-800 py-2 rounded-l items-center mt-4 flex-1 mr-1 border border-gray-700`}
        onPress={onPress}
      >
        <Text style={tw`text-white text-base`}>{title}</Text>
      </TouchableOpacity>
    
  );
};

export default Button;