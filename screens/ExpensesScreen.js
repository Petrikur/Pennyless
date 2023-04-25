// ExpensesScreen.js
import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Button } from "react-native-paper";
import ExpensesList from "../components/ExpensesList";



const ExpensesScreen = () => {
  return (
    <View>
      <Text>Expenses</Text>
      <Text>Last 7 days</Text>
      <Text>350€</Text>
      <Button>
        <Text>Select date</Text>
      </Button>
      <ExpensesList />
    </View>
  );
};

export default ExpensesScreen;
