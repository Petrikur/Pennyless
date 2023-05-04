// ExpensesScreen.js
import React from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import Button from "../components/UI/Button";
import ExpensesList from "../components/ExpensesList";
import tw from "twrnc";
import { useContext } from "react";
import { DataContext } from "../components/context/DataContext";
import Chart from "../components/UI/chart";

const ExpensesScreen = () => {
  const dataContext = useContext(DataContext);
  const testData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
      <View style={tw`flex-1 `}>
        <Text style={tw`text-center`}>Expenses</Text>
        <Chart data={dataContext.expenses} />
        <ExpensesList />
      </View>
  );
};

export default ExpensesScreen;
