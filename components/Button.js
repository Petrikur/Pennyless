import React from "react";
import tw from "twrnc";

import { Pressable, Text, View } from "react-native";

const Button = (props) => {
  const press = () => {
    
  };

  return (
    <Pressable
      onPress={press}
      style={tw`bg-blue-500 text-center items-center justify-center py-2 px-4 rounded`}
    >
      <Text style={tw`text-white font-bold`}>{props.type}</Text>
    </Pressable>
  );
};

export default Button;
