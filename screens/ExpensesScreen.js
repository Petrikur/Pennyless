// ExpensesScreen.js
import React, { useState } from "react";
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
    <ScrollView>
    <View style={tw`flex-1 bg-gray-800 `}>
      <Chart data={dataContext.filteredContextExpenses} />
      <List type={"expense"} data={dataContext.expenses} />
    </View></ScrollView>
  );
};

export default ExpensesScreen;
