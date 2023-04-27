// ExpensesScreen.js
import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import Button from "../components/UI/Button";
import ExpensesList from "../components/ExpensesList";
import tw from "twrnc";

const ExpensesScreen = () => {
  return (
    <View style={tw`flex-1 `}>
      <Text style= {tw`text-center`}>Expenses</Text>
      <ExpensesList />
    </View>
  );
};

export default ExpensesScreen;
