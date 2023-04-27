import React from "react";
import { View, Text } from "react-native";
import IncomesList from "../components/IncomesList";
import tw from "twrnc";
import { Button } from "react-native-paper";

const IncomesScreen = () => {
  return (
    <View style={tw`flex-1`}>
      <Button>
        <Text>Select date</Text>
      </Button>
      <IncomesList />
    </View>
  );
};

export default IncomesScreen;
