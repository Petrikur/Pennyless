import React from "react";
import { View, Text } from "react-native";
import IncomesList from "../components/IncomesList";

const IncomesScreen = () => {
  return (
    <View>
      <Text>Incomes</Text>
      <IncomesList/>
    </View>
  );
};

export default IncomesScreen;
