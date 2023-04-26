// Expenselist.js

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import List from "../components/List";
import tw from "twrnc";

import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const ExpensesList = () => {
  const dataContext = useContext(DataContext);
  const [totalExp, setTotalExp] = useState();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    calculateTotalExp();
    // dataContext.setExpenses(dataContext.expenses)
  }, [dataContext.expenses]);

  const calculateTotalExp = () => {
    let total = 0;
    dataContext.expenses.forEach((item) => {
      total += item.amount;
    });
    setTotalExp(total);
  };

  return (
    <>
      {/* <View style={tw`flex-1 items-center justify-center `}> */}
      <Text style={tw`text-xl`}>Total: {totalExp} €</Text>
      <List type={"expense"} data={dataContext.expenses} />
      {/* </View>    */}
    </>
  );
};

export default ExpensesList;
