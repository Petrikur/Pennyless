// Expenselist.js

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import List from "../components/List";
import tw from "twrnc";

import { useContext } from "react";
import { DataContext } from "./context/DataContext";

const ExpensesList = () => {
  const dataContext = useContext(DataContext);
  return (
    <>
      <List type={"expense"} data={dataContext.expenses} />
    </>
  );
};

export default ExpensesList;
