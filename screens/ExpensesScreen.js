// ExpensesScreen.js
import React from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import Button from "../components/UI/Button";
import tw from "twrnc";
import { useContext } from "react";
import { DataContext } from "../components/context/DataContext";
import Chart from "../components/UI/chart";

  import List from "../components/List";

const ExpensesScreen = () => {
  const dataContext = useContext(DataContext);
  return (
      <View style={tw`flex-1 `}>
        <Text style={tw`text-center`}>Expenses</Text>
        <Chart data={dataContext.expenses} />
        <List type={"expense"} data={dataContext.expenses} />
      </View>
  );
};

export default ExpensesScreen;
